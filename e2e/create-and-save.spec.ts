import { expect, test } from "@playwright/test";

test("search -> view -> add favorite", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Найти шаблон...").fill("маркет");
  await page.getByRole("button", { name: "Поиск" }).click();
  await expect(page).toHaveURL(/\/search\?query=/);
  await page.getByRole("link", { name: "Открыть" }).first().click();
  await page.getByRole("button", { name: "Убрать из избранного" }).click();
  await page.getByRole("button", { name: "В избранное" }).click();
  await expect(page.getByRole("link", { name: "Назад в каталог" })).toBeVisible();
});

test("create -> save -> appears in profile", async ({ page }) => {
  await page.goto("/create");
  await page.getByPlaceholder("Название").fill("Тестовый шаблон Playwright");
  await page.getByPlaceholder("Краткое описание").fill("Описание для e2e проверки сохранения шаблона.");
  await page.getByPlaceholder("Текст промпта").fill("Подробный текст промпта для проверки полного цикла создания и отображения.");
  await page.getByPlaceholder("Теги через запятую").fill("e2e, test");
  await page.getByRole("button", { name: "Сохранить шаблон" }).click();
  await expect(page).toHaveURL(/\/prompts\//);
  await page.getByRole("link", { name: "В мои шаблоны" }).click();
  await expect(page.getByText("Тестовый шаблон Playwright")).toBeVisible();
});
