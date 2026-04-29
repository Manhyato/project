import Link from "next/link";
import { CURRENT_USER } from "@/lib/auth";

export default function ProfilePage() {
  return (
    <section className="space-y-4 rounded border bg-white p-4">
      <h1 className="text-2xl font-semibold">Профиль пользователя</h1>
      <p>
        <strong>Имя:</strong> {CURRENT_USER.name}
      </p>
      <p>
        <strong>Роль:</strong> {CURRENT_USER.role === "author" ? "Автор" : "Гость"}
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
