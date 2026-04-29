import { CURRENT_USER_ID, promptStore } from "@/lib/mock-data";
import { Prompt, PromptInput } from "@/types/prompt";

const normalized = (value: string) => value.trim().toLowerCase();

export function getAllPrompts(): Prompt[] {
  return [...promptStore];
}

export function getPromptById(id: string): Prompt | undefined {
  return promptStore.find((item) => item.id === id);
}

export function searchPrompts(query: string): Prompt[] {
  const q = normalized(query);
  if (!q) return getAllPrompts();

  return promptStore.filter((item) => {
    const haystack = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function getSearchSuggestions(query: string): string[] {
  const q = normalized(query);
  if (q.length < 3) return [];

  return promptStore
    .map((item) => item.title)
    .filter((title) => title.toLowerCase().includes(q))
    .slice(0, 5);
}

export function filterByCategory(prompts: Prompt[], category: Prompt["category"]): Prompt[] {
  return prompts.filter((item) => item.category === category);
}

export function createPrompt(input: PromptInput): Prompt {
  const prompt: Prompt = {
    ...input,
    id: `prompt-${Date.now()}`,
    authorId: CURRENT_USER_ID,
  };
  promptStore.unshift(prompt);
  return prompt;
}

export function updatePrompt(id: string, input: PromptInput): Prompt | null {
  const index = promptStore.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updated = { ...promptStore[index], ...input, id };
  promptStore[index] = updated;
  return updated;
}

export function getMyPrompts(): Prompt[] {
  return promptStore.filter((item) => item.authorId === CURRENT_USER_ID);
}

export function getFavoritePrompts(): Prompt[] {
  return promptStore.filter((item) => item.isFavorite);
}
