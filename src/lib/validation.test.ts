import { promptSchema } from "@/lib/validation";

describe("prompt form schema", () => {
  it("blocks invalid payload", () => {
    const result = promptSchema.safeParse({
      title: "bad",
      description: "short",
      content: "tiny",
      category: "development",
      tags: "",
    });
    expect(result.success).toBe(false);
  });
});
