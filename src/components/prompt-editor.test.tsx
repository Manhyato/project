import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { useState } from "react";
import { PromptEditor } from "@/components/prompt-editor";

function PromptEditorHarness() {
  const [value, setValue] = useState("## Heading");
  return <PromptEditor ariaLabel="Текст промпта" value={value} onChange={setValue} />;
}

describe("PromptEditor", () => {
  it("renders controlled value and handles changes", async () => {
    render(<PromptEditorHarness />);

    const editor = screen.getByLabelText("Текст промпта");
    fireEvent.change(editor, { target: { value: "## Heading {{variable}}" } });

    expect(editor).toHaveValue("## Heading {{variable}}");
  });

  it("formats selected text with toolbar buttons", () => {
    render(<PromptEditorHarness />);

    const editor = screen.getByLabelText("Текст промпта") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(3, 10);

    fireEvent.click(screen.getByRole("button", { name: "Жирный" }));

    expect(editor).toHaveValue("## **Heading**");
  });
});
