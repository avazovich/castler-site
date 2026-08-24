import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnimatedText } from "@/components/AnimatedText";
import { ArrowRightIcon } from "@/components/icons";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-6 pt-24 sm:px-10">
      <p className="label-mono text-ink-soft">404</p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">
        <AnimatedText text={t("title")} />
      </h1>
      <p className="mt-4 text-ink-soft">{t("body")}</p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-ink hover:text-paper active:scale-[0.97]"
      >
        {t("cta")}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
