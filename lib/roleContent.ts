import { getMessages } from "next-intl/server";

export type RoleContent = { intro: string; requirements: string[]; howToApply: string };

/** Resolves a role's long-form description from the Careers.roles.<slug> messages entry. */
export async function getRoleContent(slug: string): Promise<RoleContent | undefined> {
  const messages = await getMessages();
  const careers = messages.Careers as { roles?: Record<string, RoleContent> } | undefined;
  return careers?.roles?.[slug];
}
