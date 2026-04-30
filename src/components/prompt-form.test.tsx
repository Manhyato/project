import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PromptForm } from "@/components/prompt-form";

jest.mock("next/dynamic", () => {
  return () => {
    const LoadedComponent = require("@/components/prompt-editor").default;
    return LoadedComponent;
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("PromptForm integration", () => {
  it("updates prompt editor value", async () => {
    const user = userEvent.setup();
    render(<PromptForm mode="create" />);

    const editor = await screen.findByLabelText("Текст промпта");
    await user.type(editor, "Новый текст для промпта");

    expect(editor).toHaveValue("Новый текст для промпта");
  });
});
