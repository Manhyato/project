import { Prompt } from "@/types/prompt";

export const CURRENT_USER_ID = "author-1";

export const promptStore: Prompt[] = [
  {
    id: "prompt-1",
    title: "Генератор маркетинговых офферов",
    description: "Создает 5 офферов под выбранную аудиторию.",
    content: "Ты senior-маркетолог. Сгенерируй 5 офферов для [аудитория] с фокусом на [боль].",
    category: "marketing",
    tags: ["offers", "copywriting"],
    authorId: "author-1",
    isPublic: true,
    isFavorite: true,
  },
  {
    id: "prompt-2",
    title: "Ревью pull request",
    description: "Проверка рисков, регрессий и тестового покрытия.",
    content: "Сделай code review diff, выдели риски и предложи тест-кейсы.",
    category: "development",
    tags: ["code-review", "testing"],
    authorId: "author-2",
    isPublic: true,
  },
  {
    id: "prompt-3",
    title: "План урока за 30 минут",
    description: "Структурирует занятие с практикой и проверкой знаний.",
    content: "Собери план урока по теме [тема], уровень [уровень], длительность 30 минут.",
    category: "education",
    tags: ["lesson", "teaching"],
    authorId: "author-1",
    isPublic: true,
  },
];
