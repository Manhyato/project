"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/lib/auth-store";

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
    <section className="max-w-md space-y-4 rounded border bg-white p-4">
      <h1 className="text-2xl font-semibold">Вход</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            aria-label="Email"
            className="w-full rounded border px-3 py-2"
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
            className="w-full rounded border px-3 py-2"
            placeholder="Введите пароль"
          />
        </label>
        {errors.password ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}

        <button
          type="submit"
          aria-label="Войти в профиль"
          disabled={isSubmitting}
          className="rounded bg-black px-4 py-2 text-white disabled:bg-zinc-400"
        >
          Войти
        </button>
      </form>
    </section>
  );
}
