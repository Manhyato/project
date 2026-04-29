"use client";

import { useSyncExternalStore } from "react";
import { promptStore } from "@/lib/mock-data";
import { Prompt, PromptInput } from "@/types/prompt";

const STORAGE_KEY = "prompthub_prompts_v1";

let state: Prompt[] = [...promptStore];
const listeners = new Set<() => void>();
let initialized = false;

const normalize = (value: string) => value.trim().toLowerCase();

function notify() {
  listeners.forEach((listener) => listener());
}

function saveToStorage() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function initFromStorage() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as Prompt[];
    if (Array.isArray(parsed)) state = parsed;
  } catch {
    state = [...promptStore];
  }
}

function setState(next: Prompt[]) {
  state = next;
  saveToStorage();
  notify();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  initFromStorage();
  return state;
}

export function usePrompts() {
  return useSyncExternalStore(subscribe, getSnapshot, () => promptStore);
}

export function createPrompt(input: PromptInput): Prompt {
  initFromStorage();
  const prompt: Prompt = {
    ...input,
    id: crypto.randomUUID(),
  };
  setState([prompt, ...state]);
  return prompt;
}

export function updatePrompt(id: string, input: PromptInput): Prompt | null {
  initFromStorage();
  const index = state.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updated = { ...state[index], ...input, id };
  const next = [...state];
  next[index] = updated;
  setState(next);
  return updated;
}

export function toggleFavorite(id: string): Prompt | null {
  initFromStorage();
  const target = state.find((item) => item.id === id);
  if (!target) return null;
  return updatePrompt(id, { ...target, isFavorite: !target.isFavorite });
}

export function getPromptById(id: string): Prompt | undefined {
  initFromStorage();
  return state.find((item) => item.id === id);
}

export function searchPrompts(query: string): Prompt[] {
  initFromStorage();
  const q = normalize(query);
  if (!q) return [...state];
  return state.filter((item) => {
    const haystack = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function getSearchSuggestions(query: string): string[] {
  initFromStorage();
  const q = normalize(query);
  if (q.length < 3) return [];
  return state
    .map((item) => item.title)
    .filter((title) => title.toLowerCase().includes(q))
    .slice(0, 5);
}

export function getAllPrompts() {
  initFromStorage();
  return [...state];
}
