import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/icons";
import { RoleDetailContent } from "@/components/RoleDetailContent";
import { getRole, openRoles, TELEGRAM_APPLY_URL } from "@/content/roles";
import { getRoleContent } from "@/lib/roleContent";

export function generateStaticParams() {
  return openRoles.map((role) => ({ role: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role: slug } = await params;
  const role = getRole(slug);
  return { title: role ? `${role.title} — Castler` : "Castler" };
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const t = await getTranslations("Careers");
  const content = await getRoleContent(slug);
  if (!content) notFound();

  return (
    <div className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <Link
          href="/careers"
          className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
          {t("roleBack")}
        </Link>

        <div className="mt-8">
          <RoleDetailContent
            slug={role.slug}
            title={role.title}
            location={t("officeHeading")}
            intro={content.intro}
            requirements={content.requirements}
            howToApply={content.howToApply}
            applyUrl={TELEGRAM_APPLY_URL}
            labels={{
              location: t("roleLocation"),
              whatWereLookingFor: t("roleWhatWereLookingFor"),
              howToApply: t("roleHowToApply"),
              apply: t("applyCta"),
              share: t("roleShare"),
              shareCopied: t("roleShareCopied"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
