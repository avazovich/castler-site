import Image from "next/image";
import Link from "next/link";
import { ApplyForm } from "@/components/ApplyForm";
import { Wordmark } from "@/components/Wordmark";

/**
 * Plain next/link, not the locale-aware Link from @/i18n/navigation — this
 * page sits outside app/[locale]/ on purpose (see app/apply/layout.tsx) and
 * has no NextIntlClientProvider to resolve it against. Every internal link
 * here goes to an explicit /uz/... path instead.
 */

export default function ApplyPage() {
  return (
    <div className="relative">
      {/* Faint repeating grid texture behind the hero, matching the dark
          hero treatment elsewhere on the site rather than a flat fill. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line-on-ink) 1px, transparent 1px), linear-gradient(90deg, var(--line-on-ink) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <header className="relative flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <Link href="/uz" aria-label="Castler — bosh sahifa">
          <Wordmark variant="cream" height={22} />
        </Link>
        <a
          href="#ariza"
          className="label-mono hidden items-center gap-2 text-paper/70 transition-colors hover:text-paper sm:inline-flex"
        >
          Ariza qoldirish
          <span aria-hidden="true">→</span>
        </a>
      </header>

      <section className="relative px-6 pb-16 pt-8 sm:px-10 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <p className="label-mono flex items-center gap-2 text-gold-light">
            <span className="h-px w-6 bg-gold-light" />
            Vakansiyalar · 2026
          </p>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] sm:text-6xl">
            Jamoamizga qo&apos;shiling
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            Castler — interyer dizayn, arxitektura va vizualizatsiya studiyasi. Biz
            O&apos;zbekistondagi eng yirik loyihalar va brendlar bilan ishlaymiz. Biz bilan
            ishlashni xohlasangiz — arizani to&apos;ldiring.
          </p>
          <p className="label-mono mt-6 text-paper/50">
            Interyer dizayner &nbsp;·&nbsp; Arxitektor &nbsp;·&nbsp; Vizualizator
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#ariza"
              className="pill bg-gold text-ink hover:bg-gold-light"
            >
              Ariza qoldirish →
            </a>
            <p className="text-sm text-paper/50">
              To&apos;ldirish 3–4 daqiqa · 48 soat ichida javob beramiz
            </p>
          </div>
        </div>
      </section>

      <ApplyForm />

      <footer className="relative border-t border-line-on-ink px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-5xl">
          {/* Not part of the application funnel itself, so kept quiet and
              secondary — but a visitor who wants to see the studio's actual
              work before applying shouldn't hit a dead end to do it. */}
          <div className="label-mono flex flex-wrap justify-center gap-x-6 gap-y-2 text-paper/40 sm:justify-start">
            <Link href="/uz" className="hover:text-paper">
              Bosh sahifa
            </Link>
            <Link href="/uz/work" className="hover:text-paper">
              Ishlarimiz
            </Link>
            <Link href="/uz/about" className="hover:text-paper">
              Biz haqimizda
            </Link>
            <Link href="/uz/contact" className="hover:text-paper">
              Bog&apos;lanish
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-line-on-ink pt-6 sm:flex-row">
            <Link href="/uz" aria-label="Castler — bosh sahifa">
              <Image src="/brand/mark-gold.png" alt="" width={20} height={20} className="opacity-80" />
            </Link>
            <p className="label-mono text-paper/40">© 2026 Castler Studio</p>
            <div className="label-mono flex gap-4 text-paper/50">
              <a href="https://www.instagram.com/castler.uz" target="_blank" rel="noreferrer" className="hover:text-paper">
                Instagram
              </a>
              <a href="https://t.me/castler_group" target="_blank" rel="noreferrer" className="hover:text-paper">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
