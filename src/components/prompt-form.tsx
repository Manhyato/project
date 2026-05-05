"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { canCreate } from "@/lib/auth";
import { createPrompt, updatePrompt } from "@/lib/prompt-store";
import { PromptFormValues, promptSchema } from "@/lib/validation";
import { Prompt } from "@/types/prompt";
import { Button } from "@/components/ui/button";

const PromptEditor = dynamic(() => import("@/components/prompt-editor"), {
  ssr: false,
  loading: () => <p className="rounded border border-dashed p-3 text-sm text-zinc-500">Загрузка редактора...</p>,
});

type PromptFormProps = {
  mode: "create" | "edit";
  initialValues?: Prompt;
};

function PromptFormComponent({ mode, initialValues }: PromptFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <label className="block space-y-1">
        <span className="text-sm font-medium">Название</span>
        <input
          {...register("title")}
          aria-label="Название промпта"
          placeholder="Название"
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </label>
      {errors.title ? <p className="text-sm text-red-600">{errors.title.message}</p> : null}

      <label className="block space-y-1">
        <span className="text-sm font-medium">Краткое описание</span>
        <input
          {...register("description")}
          aria-label="Краткое описание"
          placeholder="Краткое описание"
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </label>
      {errors.description ? <p className="text-sm text-red-600">{errors.description.message}</p> : null}

      <div className="space-y-1">
        <span className="text-sm font-medium">Текст промпта</span>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <PromptEditor
              id="prompt-content-editor"
              ariaLabel="Текст промпта"
              value={field.value}
              onChange={field.onChange}
              placeholder="Текст промпта"
            />
          )}
        />
      </div>
      {errors.content ? <p className="text-sm text-red-600">{errors.content.message}</p> : null}

      <label className="block space-y-1">
        <span className="text-sm font-medium">Категория</span>
        <select
          {...register("category")}
          aria-label="Категория"
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="development">Разработка</option>
          <option value="marketing">Маркетинг</option>
          <option value="education">Обучение</option>
          <option value="analysis">Аналитика</option>
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Теги через запятую</span>
        <input
          {...register("tags")}
          aria-label="Теги через запятую"
          placeholder="Теги через запятую"
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </label>
      {errors.tags ? <p className="text-sm text-red-600">{errors.tags.message}</p> : null}

      <Button
        type="submit"
        variant="primary"
        aria-label={mode === "create" ? "Сохранить шаблон" : "Сохранить изменения шаблона"}
        disabled={!isValid || isSubmitting || (mode === "create" && !canCreate())}
      >
        {mode === "create" ? "Сохранить шаблон" : "Сохранить изменения"}
      </Button>
    </form>
  );
}

export const PromptForm = memo(PromptFormComponent);
