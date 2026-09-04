"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const DIRECTIONS = [
  { slug: "interior-designer", title: "Interyer dizayner", subtitle: "Interyerlar va yashash muhitini loyihalash" },
  { slug: "architectural-designer", title: "Arxitektor", subtitle: "Konsept va arxitektura yechimlari" },
  { slug: "visualization-artist", title: "Vizualizator", subtitle: "3D render va vizual kontent" },
  { slug: "facade-designer", title: "Fasad dizayneri", subtitle: "Bino qobig'i va tashqi ko'rinish" },
] as const;

const EXPERIENCE_OPTIONS = ["Tajribasiz", "1–3 yil", "3–5 yil", "5+ yil"];
const STATUS_OPTIONS = ["Ishlayman", "O'qiyman", "Bo'sh vaqt"];
const PROJECT_SIZE_OPTIONS = ["50 m² gacha", "50–150 m²", "150–500 m²", "500+ m²"];
const BIM_OPTIONS = ["AutoCAD", "Revit", "ArchiCAD"];
const YES_NO_OPTIONS = ["Ha", "Yo'q"];
const SALARY_OPTIONS = ["5 mln gacha", "5–10 mln", "10–20 mln", "20–40 mln", "40 mln+", "Kelishilgan holda"];
const AVAILABILITY_OPTIONS = ["Hozir", "1 hafta ichida", "2 hafta ichida", "1 oy ichida"];

const STEPS = [
  { label: "Shaxsiy ma'lumot" },
  { label: "Maxsus savollar" },
  { label: "Yakuniy" },
];

interface FormState {
  fullName: string;
  phone: string;
  telegramSameAsPhone: boolean;
  telegram: string;
  direction: string;
  experience: string;
  status: string;
  portfolioLink: string;
  projectSize: string;
  ergonomicsApproach: string;
  bimSoftware: string[];
  hasExpertise: string;
  expectedSalary: string;
  availability: string;
  socialLink: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  phone: "",
  telegramSameAsPhone: true,
  telegram: "",
  direction: "",
  experience: "",
  status: "",
  portfolioLink: "",
  projectSize: "",
  ergonomicsApproach: "",
  bimSoftware: [],
  hasExpertise: "",
  expectedSalary: "",
  availability: "",
  socialLink: "",
};

function formatUzPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^998/, "");
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean);
  return parts.length ? `+998 ${parts.join(" ")}` : "";
}

export function ApplyForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleBim(option: string) {
    setForm((f) => ({
      ...f,
      bimSoftware: f.bimSoftware.includes(option)
        ? f.bimSoftware.filter((o) => o !== option)
        : [...f.bimSoftware, option],
    }));
  }

  const step1Valid =
    form.fullName.trim().length > 1 &&
    form.phone.replace(/\D/g, "").length >= 12 &&
    (form.telegramSameAsPhone || form.telegram.trim().length > 3) &&
    form.direction &&
    form.experience &&
    form.status;

  const step2Valid =
    form.portfolioLink.trim().length > 3 &&
    form.projectSize &&
    form.ergonomicsApproach.trim().length > 3 &&
    form.bimSoftware.length > 0 &&
    form.hasExpertise &&
    form.expectedSalary;

  const step3Valid = Boolean(form.availability);

  function goNext() {
    trackEvent("careers_apply_step", { step: step + 2 });
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function submit() {
    const direction = DIRECTIONS.find((d) => d.slug === form.direction);
    trackEvent("careers_apply_submit", { role: form.direction, experience: form.experience });

    const subject = `Yangi ariza: ${direction?.title ?? form.direction} — ${form.fullName}`;
    const body = [
      `Ism: ${form.fullName}`,
      `Telefon: ${form.phone}`,
      `Telegram: ${form.telegramSameAsPhone ? form.phone + " (telefon bilan bir xil)" : form.telegram}`,
      `Yo'nalish: ${direction?.title ?? form.direction}`,
      `Tajriba: ${form.experience}`,
      `Hozirgi holati: ${form.status}`,
      "",
      `Portfolio: ${form.portfolioLink}`,
      `Ishlagan loyiha hajmi: ${form.projectSize}`,
      `Ergonomika/yorug'lik yondashuvi: ${form.ergonomicsApproach}`,
      `BIM dasturlari: ${form.bimSoftware.join(", ")}`,
      `Ekspertiza tajribasi: ${form.hasExpertise}`,
      `Kutilgan oylik maosh: ${form.expectedSalary}`,
      "",
      `Boshlay olish vaqti: ${form.availability}`,
      form.socialLink && `LinkedIn/Instagram: ${form.socialLink}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:hello@castler.uz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="ariza" className="scroll-mt-10 px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-line-on-ink bg-ink-2 p-10 text-center">
          <p className="label-mono text-gold-light">Ariza</p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl">Rahmat, {form.fullName.split(" ")[0]}!</h2>
          <p className="mt-4 text-paper/70">
            Arizangiz jamoamizga yuborildi. Elektron pochta ilovangiz ochilmagan bo&apos;lsa, biz bilan to&apos;g&apos;ridan-to&apos;g&apos;ri{" "}
            <a href="https://t.me/castler_group" target="_blank" rel="noreferrer" className="text-gold-light underline">
              Telegram
            </a>{" "}
            orqali ham bog&apos;lanishingiz mumkin. 48 soat ichida javob beramiz.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="ariza" className="scroll-mt-10 px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="label-mono text-gold-light">Ariza</p>
        <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
          Bir necha qadamda o&apos;zingiz haqingizda ayting
        </h2>

        <StepIndicator step={step} />

        <div className="mt-8 rounded-2xl border border-line-on-ink bg-ink-2 p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-6">
              <Field label="To'liq ism, familiya" required>
                <TextInput
                  value={form.fullName}
                  onChange={(v) => set("fullName", v)}
                  placeholder="Ali Valiyev"
                />
              </Field>

              <Field label="Telefon raqami" required>
                <TextInput
                  value={form.phone}
                  onChange={(v) => set("phone", formatUzPhone(v))}
                  placeholder="+998 __ ___ __ __"
                  type="tel"
                />
              </Field>

              <label className="flex items-center gap-2 text-sm text-paper/70">
                <input
                  type="checkbox"
                  checked={form.telegramSameAsPhone}
                  onChange={(e) => set("telegramSameAsPhone", e.target.checked)}
                  className="h-4 w-4 accent-gold"
                />
                Telegram raqamim bilan bir xil
              </label>

              {!form.telegramSameAsPhone && (
                <Field label="Telegram raqami yoki foydalanuvchi nomi" required>
                  <TextInput value={form.telegram} onChange={(v) => set("telegram", v)} placeholder="@username" />
                </Field>
              )}

              <Field label="Yo'nalish" required>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {DIRECTIONS.map((d, i) => (
                    <OptionCard
                      key={d.slug}
                      index={i + 1}
                      title={d.title}
                      subtitle={d.subtitle}
                      selected={form.direction === d.slug}
                      onClick={() => set("direction", d.slug)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Ish tajribasi" required>
                <ChipGroup options={EXPERIENCE_OPTIONS} value={form.experience} onChange={(v) => set("experience", v)} />
              </Field>

              <Field label="Hozirgi holatingiz" required>
                <ChipGroup options={STATUS_OPTIONS} value={form.status} onChange={(v) => set("status", v)} />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Field label="Portfolio havolasi" required hint="Behance, Google Drive yoki boshqa havola">
                <TextInput
                  value={form.portfolioLink}
                  onChange={(v) => set("portfolioLink", v)}
                  placeholder="https://"
                  type="url"
                />
              </Field>

              <Field label="Qanday hajmli obyektlar bilan ishlagansiz?" required>
                <ChipGroup options={PROJECT_SIZE_OPTIONS} value={form.projectSize} onChange={(v) => set("projectSize", v)} />
              </Field>

              <Field label="Ergonomika va yorug'lik yondashuvingiz" required>
                <TextArea value={form.ergonomicsApproach} onChange={(v) => set("ergonomicsApproach", v)} />
              </Field>

              <Field label="Texnik chizma va BIM dasturlari" required>
                <div className="flex flex-wrap gap-3">
                  {BIM_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                        form.bimSoftware.includes(option)
                          ? "border-gold bg-gold/10 text-paper"
                          : "border-line-on-ink text-paper/70 hover:border-paper/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.bimSoftware.includes(option)}
                        onChange={() => toggleBim(option)}
                        className="h-4 w-4 accent-gold"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Ekspertiza bilan ishlaganmisiz?" required>
                <ChipGroup options={YES_NO_OPTIONS} value={form.hasExpertise} onChange={(v) => set("hasExpertise", v)} />
              </Field>

              <Field label="Kutilgan oylik maosh (UZS)" required>
                <ChipGroup options={SALARY_OPTIONS} value={form.expectedSalary} onChange={(v) => set("expectedSalary", v)} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Field label="Qachon boshlay olasiz?" required>
                <ChipGroup options={AVAILABILITY_OPTIONS} value={form.availability} onChange={(v) => set("availability", v)} />
              </Field>

              <Field label="LinkedIn yoki Instagram">
                <TextInput value={form.socialLink} onChange={(v) => set("socialLink", v)} placeholder="https://" />
              </Field>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button
                onClick={goBack}
                className="label-mono inline-flex items-center gap-2 text-paper/60 transition-colors hover:text-paper"
              >
                ← Orqaga
              </button>
            ) : (
              <span />
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={goNext}
                disabled={step === 0 ? !step1Valid : !step2Valid}
                className="pill bg-gold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                Davom etish →
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!step3Valid}
                className="pill bg-gold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                Arizani yuborish →
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-paper/40">* belgilangan maydonlar to&apos;ldirilishi shart.</p>
      </div>
    </section>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 overflow-x-auto">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex shrink-0 items-center gap-3">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border label-mono text-[11px] ${
                i < step
                  ? "border-gold bg-gold text-ink"
                  : i === step
                    ? "border-gold text-gold-light"
                    : "border-line-on-ink text-paper/40"
              }`}
            >
              {i < step ? "✓" : String(i + 1).padStart(2, "0")}
            </div>
            <span className={`label-mono ${i === step ? "text-paper" : "text-paper/40"}`}>{s.label}</span>
            {i < STEPS.length - 1 && <span className="h-px w-8 bg-line-on-ink sm:w-16" />}
          </div>
        ))}
      </div>
      <div className="mt-3 h-px w-full bg-line-on-ink">
        <div
          className="h-px bg-gold transition-all duration-500"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <p className="label-mono mt-2 text-paper/40">{Math.round(((step + 1) / STEPS.length) * 100)}% to&apos;ldirildi</p>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-paper">
        {label}
        {required && <span className="text-gold-light"> *</span>}
      </label>
      {hint && <p className="mt-0.5 text-xs text-paper/40">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-line-on-ink bg-ink px-4 py-3 text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-gold"
    />
  );
}

function TextArea({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full resize-none rounded-lg border border-line-on-ink bg-ink px-4 py-3 text-paper outline-none transition-colors focus:border-gold"
    />
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
            value === option
              ? "border-gold bg-gold/10 text-paper"
              : "border-line-on-ink text-paper/70 hover:border-paper/30"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function OptionCard({
  index,
  title,
  subtitle,
  selected,
  onClick,
}: {
  index: number;
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-4 text-left transition-colors ${
        selected ? "border-gold bg-gold/10" : "border-line-on-ink hover:border-paper/30"
      }`}
    >
      <span className="label-mono text-paper/40">{String(index).padStart(2, "0")}</span>
      <p className="mt-1 font-medium text-paper">{title}</p>
      <p className="mt-0.5 text-xs text-paper/50">{subtitle}</p>
    </button>
  );
}
