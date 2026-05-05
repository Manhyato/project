"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Пароль обязателен"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { loginAsAuthor } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      loginAsAuthor(values.email);
      router.push("/profile");
    },
    [loginAsAuthor, router],
  );

  return (
    <section className="max-w-md space-y-4 rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold">Вход</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            aria-label="Email"
            className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="you@example.com"
          />
        </label>
        {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}

        <label className="block space-y-1">
          <span className="text-sm font-medium">Пароль</span>
          <input
            {...register("password")}
            type="password"
            autoComplete="current-password"
            aria-label="Пароль"
            className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Введите пароль"
          />
        </label>
        {errors.password ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}

        <Button
          type="submit"
          variant="primary"
          aria-label="Войти в профиль"
          disabled={isSubmitting}
        >
          Войти
        </Button>
      </form>
    </section>
  );
}
