import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PromptForm } from "@/components/prompt-form";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("PromptForm integration", () => {
  it("updates textarea value in editor", async () => {
    const user = userEvent.setup();
    render(<PromptForm mode="create" />);

    const textarea = screen.getByPlaceholderText("Текст промпта");
    await user.type(textarea, "Новый текст для промпта");

    expect(textarea).toHaveValue("Новый текст для промпта");
  });
});
