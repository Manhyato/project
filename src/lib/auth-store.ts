"use client";

import { useSyncExternalStore } from "react";

export type UserRole = "guest" | "author";

const STORAGE_KEY = "prompthub_role_v1";
const AUTHOR_ID = "author-1";
const DEFAULT_NAME = "Demo Author";

type AuthState = {
  id: string;
  name: string;
  role: UserRole;
};

const INITIAL_AUTH_STATE: AuthState = {
  id: AUTHOR_ID,
  name: DEFAULT_NAME,
  role: "guest",
};

let state: AuthState = INITIAL_AUTH_STATE;

let initialized = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function initFromStorage() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const savedRole = window.localStorage.getItem(STORAGE_KEY);
  if (savedRole === "author") {
    state = { ...state, role: "author" };
  }
}

function persistRole(role: UserRole) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, role);
}

export const authStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    initFromStorage();
    return state;
  },
  loginAsAuthor(email: string) {
    initFromStorage();
    const [name] = email.split("@");
    state = {
      ...state,
      role: "author",
      name: name || "Author",
    };
    persistRole("author");
    notify();
  },
  logout() {
    initFromStorage();
    state = {
      ...state,
      role: "guest",
      name: DEFAULT_NAME,
    };
    persistRole("guest");
    notify();
  },
};

function getServerSnapshot() {
  return INITIAL_AUTH_STATE;
}

export function useAuth() {
  const user = useSyncExternalStore(authStore.subscribe, authStore.getSnapshot, getServerSnapshot);
  return {
    user,
    role: user.role,
    isAuthor: user.role === "author",
    loginAsAuthor: authStore.loginAsAuthor,
    logout: authStore.logout,
  };
}
