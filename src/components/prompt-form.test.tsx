import { loginAsAuthor, logout } from "@/lib/auth";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PromptForm } from "@/components/prompt-form";

jest.mock("next/dynamic", () => {
  return () => {
    return jest.requireActual("@/components/prompt-editor").default;
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("PromptForm integration", () => {
  beforeEach(() => {
    loginAsAuthor("author@example.com");
  });

  afterEach(() => {
    logout();
  });

  it("updates prompt editor value", async () => {
    const user = userEvent.setup();
    render(<PromptForm mode="create" />);

    const editor = await screen.findByLabelText("Текст промпта");
    await user.type(editor, "Новый текст для промпта");

    expect(editor).toHaveValue("Новый текст для промпта");
  });

  it("focuses first invalid field after submit", async () => {
    const user = userEvent.setup();
    render(<PromptForm mode="create" />);

    await user.click(screen.getByRole("button", { name: "Сохранить шаблон" }));

    await waitFor(() => expect(screen.getByLabelText("Название промпта")).toHaveFocus());
  });
});
