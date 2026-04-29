export type PromptCategory = "marketing" | "development" | "education" | "analysis";

export type Prompt = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  authorId: string;
  isPublic: boolean;
  isFavorite?: boolean;
};

export type PromptInput = Omit<Prompt, "id">;
