// Best-effort Telegram notification — never allowed to throw. A Telegram
// outage or misconfigured env var must never fail the request that
// triggered it (the applicant already submitted; losing the notification
// is recoverable, losing the whole request isn't).
export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("notifyTelegram: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping");
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    if (!res.ok) {
      console.error("notifyTelegram: Telegram API returned", res.status, await res.text());
    }
  } catch (err) {
    console.error("notifyTelegram: failed to send", err);
  }
}
