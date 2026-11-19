// Best-effort Telegram notification — never allowed to throw. A Telegram
// outage or misconfigured env var must never fail the request that
// triggered it (the applicant already submitted; losing the notification
// is recoverable, losing the whole request isn't).

// The founders' group («Castler Management», the old Leads group) got a new id
// when topics were turned on (2026-11-19). The old id in TELEGRAM_CHAT_ID is
// mapped here, and any later move Telegram reports is followed once.
const MOVED: Record<string, string> = { "-5499045694": "-1003820669157" };

/** Job applications go to the group's «vacancy» topic. */
export const VACANCY_TOPIC = Number(process.env.TELEGRAM_VACANCY_TOPIC_ID ?? 2);

type Reply = { ok?: boolean; description?: string; parameters?: { migrate_to_chat_id?: number } };

export async function notifyTelegram(text: string, topic?: number): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const raw = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !raw) {
    console.warn("notifyTelegram: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping");
    return;
  }

  const send = async (chatId: string, thread?: number): Promise<Reply> => {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, message_thread_id: thread || undefined, text, parse_mode: "HTML" }),
    });
    return (await res.json().catch(() => ({}))) as Reply;
  };

  try {
    let chatId = MOVED[raw] ?? raw;
    let body = await send(chatId, topic);
    if (!body.ok && body.parameters?.migrate_to_chat_id) {
      chatId = String(body.parameters.migrate_to_chat_id);
      body = await send(chatId, topic);
    }
    // A deleted or wrong topic shouldn't lose the message: post it to the group's main topic.
    if (!body.ok && topic && /thread|topic/i.test(body.description ?? "")) body = await send(chatId);
    if (!body.ok) console.error("notifyTelegram: Telegram rejected the message:", body.description);
  } catch (err) {
    console.error("notifyTelegram: failed to send", err);
  }
}
