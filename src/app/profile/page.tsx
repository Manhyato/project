"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-store";

export default function ProfilePage() {
  const { user, role } = useAuth();

  return (
    <section className="space-y-4 rounded border bg-white p-4">
      <h1 className="text-2xl font-semibold">Профиль пользователя</h1>
      <p>
        <strong>Имя:</strong> {user.name}
      </p>
      <p>
        <strong>Роль:</strong> {role === "author" ? "Автор" : "Гость"}
      </p>
      <div className="flex gap-4 text-sm">
        <Link href="/profile/my-templates" className="underline">
          Мои шаблоны
        </Link>
        <Link href="/profile/favorites" className="underline">
          Избранное
        </Link>
      </div>
    </section>
  );
}
