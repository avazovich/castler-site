import { NextResponse } from "next/server";
import { notifyTelegram } from "@/lib/telegram";

interface ApplyPayload {
  fullName: string;
  phone: string;
  telegramContact: string;
  directionLabel: string;
  experience: string;
  status: string;
  portfolioLink: string;
  projectSize: string;
  ergonomicsApproach: string;
  bimSoftware: string[];
  hasExpertise: string;
  expectedSalary: string;
  availability: string;
  office: string;
  socialLink: string;
}

// Telegram HTML parse_mode treats <, >, & as markup — escape any user text
// before interpolating it into the message so a stray "<" can't break
// (or, in principle, inject into) the formatted message.
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let payload: Partial<ApplyPayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!payload.fullName?.trim() || !payload.phone?.trim() || !payload.directionLabel) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const e = escapeHtml;
  const timestamp = new Intl.DateTimeFormat("uz-UZ", { dateStyle: "medium", timeStyle: "short" }).format(new Date());

  const lines = [
    "Yangi ariza 🎉",
    "",
    `👤 Ism: ${e(payload.fullName.trim())}`,
    `📞 Telefon: ${e(payload.phone.trim())}`,
    payload.telegramContact?.trim() ? `✈️ Telegram: ${e(payload.telegramContact.trim())}` : null,
    `🧭 Yo'nalish: ${e(payload.directionLabel)}`,
    payload.experience ? `⏳ Tajriba: ${e(payload.experience)}` : null,
    payload.status ? `📌 Holati: ${e(payload.status)}` : null,
    "",
    payload.portfolioLink?.trim() ? `🔗 Portfolio: ${e(payload.portfolioLink.trim())}` : null,
    payload.projectSize ? `📐 Loyiha hajmi: ${e(payload.projectSize)}` : null,
    payload.ergonomicsApproach?.trim() ? `💡 Ergonomika/yorug'lik: ${e(payload.ergonomicsApproach.trim())}` : null,
    payload.bimSoftware?.length ? `🖥 BIM: ${e(payload.bimSoftware.join(", "))}` : null,
    payload.hasExpertise ? `🧾 Ekspertiza tajribasi: ${e(payload.hasExpertise)}` : null,
    payload.expectedSalary ? `💰 Kutilgan maosh: ${e(payload.expectedSalary)}` : null,
    "",
    payload.availability ? `🚀 Boshlash vaqti: ${e(payload.availability)}` : null,
    payload.office ? `🏢 Ofis: ${e(payload.office)}` : null,
    payload.socialLink?.trim() ? `🌐 Ijtimoiy tarmoq: ${e(payload.socialLink.trim())}` : null,
    `🕐 Vaqt: ${timestamp}`,
  ].filter((line): line is string => line !== null);

  await notifyTelegram(lines.join("\n"));

  return NextResponse.json({ ok: true });
}
