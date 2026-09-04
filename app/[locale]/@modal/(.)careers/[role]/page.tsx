import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { RoleDetailModal } from "@/components/RoleDetailModal";
import { APPLY_URL, getRole } from "@/content/roles";
import { getRoleContent } from "@/lib/roleContent";

export default async function InterceptedRoleModal({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const t = await getTranslations("Careers");
  const tProject = await getTranslations("Project");
  const content = await getRoleContent(slug);
  if (!content) notFound();

  return (
    <RoleDetailModal
      key={role.slug}
      closeLabel={tProject("close")}
      slug={role.slug}
      title={role.title}
      location={t("officeHeading")}
      intro={content.intro}
      requirements={content.requirements}
      howToApply={content.howToApply}
      applyUrl={APPLY_URL}
      labels={{
        location: t("roleLocation"),
        whatWereLookingFor: t("roleWhatWereLookingFor"),
        howToApply: t("roleHowToApply"),
        apply: t("applyCta"),
        share: t("roleShare"),
        shareCopied: t("roleShareCopied"),
      }}
    />
  );
}
