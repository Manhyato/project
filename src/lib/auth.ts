export type UserRole = "guest" | "author";

export const CURRENT_USER = {
  id: "author-1",
  name: "Demo Author",
  role: "author" as UserRole,
};

export function canEdit(authorId: string) {
  return CURRENT_USER.role === "author" && CURRENT_USER.id === authorId;
}

export function canCreate() {
  return CURRENT_USER.role === "author";
}
