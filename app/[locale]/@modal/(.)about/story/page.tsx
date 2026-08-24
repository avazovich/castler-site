import { getTranslations } from "next-intl/server";
import { AboutStoryModal } from "@/components/AboutStoryModal";

export default async function InterceptedAboutStoryModal() {
  const t = await getTranslations("Project");

  return <AboutStoryModal closeLabel={t("close")} />;
}
