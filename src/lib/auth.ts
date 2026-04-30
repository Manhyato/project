import { authStore } from "@/lib/auth-store";

export const AUTHOR_ID = "author-1";

export function canEdit(authorId: string) {
  return authStore.getSnapshot().role === "author" && AUTHOR_ID === authorId;
}

export function canCreate() {
  return authStore.getSnapshot().role === "author";
}

export function loginAsAuthor(email: string) {
  authStore.loginAsAuthor(email);
}

export function logout() {
  authStore.logout();
}

export function getCurrentUser() {
  return authStore.getSnapshot();
}
