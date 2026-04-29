"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { canCreate } from "@/lib/auth";
import { createPrompt, updatePrompt } from "@/lib/prompt-store";
import { PromptFormValues, promptSchema } from "@/lib/validation";
import { Prompt } from "@/types/prompt";

type PromptFormProps = {
  mode: "create" | "edit";
  initialValues?: Prompt;
};

function PromptFormComponent({ mode, initialValues }: PromptFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    mode: "onChange",
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      content: initialValues?.content ?? "",
      category: initialValues?.category ?? "development",
      tags: initialValues?.tags.join(", ") ?? "",
      isFavorite: initialValues?.isFavorite ?? false,
    },
  });

  const onSubmit = useCallback(
    async (values: PromptFormValues) => {
      const payload = {
        ...values,
        tags: values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        authorId: initialValues?.authorId ?? "author-1",
        isPublic: true,
      };

      if (mode === "create") {
        if (!canCreate()) return;
        const created = createPrompt(payload);
        router.push(`/prompts/${created.id}`);
        return;
      }

      if (initialValues) {
        updatePrompt(initialValues.id, payload);
        router.push("/profile/my-templates");
      }
    },
    [initialValues, mode, router],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded border bg-white p-4">
      <input {...register("title")} placeholder="Название" className="w-full rounded border px-3 py-2" />
      {errors.title ? <p className="text-sm text-red-600">{errors.title.message}</p> : null}

      <input
        {...register("description")}
        placeholder="Краткое описание"
        className="w-full rounded border px-3 py-2"
      />
      {errors.description ? <p className="text-sm text-red-600">{errors.description.message}</p> : null}

      <textarea
        {...register("content")}
        rows={8}
        placeholder="Текст промпта"
        className="w-full rounded border px-3 py-2"
      />
      {errors.content ? <p className="text-sm text-red-600">{errors.content.message}</p> : null}

      <select {...register("category")} className="w-full rounded border px-3 py-2">
        <option value="development">Разработка</option>
        <option value="marketing">Маркетинг</option>
        <option value="education">Обучение</option>
        <option value="analysis">Аналитика</option>
      </select>

      <input {...register("tags")} placeholder="Теги через запятую" className="w-full rounded border px-3 py-2" />
      {errors.tags ? <p className="text-sm text-red-600">{errors.tags.message}</p> : null}

      <button
        type="submit"
        disabled={!isValid || isSubmitting || (mode === "create" && !canCreate())}
        className="rounded bg-black px-4 py-2 text-white disabled:bg-zinc-400"
      >
        {mode === "create" ? "Сохранить шаблон" : "Сохранить изменения"}
      </button>
    </form>
  );
}

export const PromptForm = memo(PromptFormComponent);
