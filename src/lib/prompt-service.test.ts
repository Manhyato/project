import { filterByCategory, getSearchSuggestions, searchPrompts } from "@/lib/prompt-service";

describe("search and filtering", () => {
  it("returns search results", () => {
    const results = searchPrompts("маркет");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns suggestions only for 3+ symbols", () => {
    expect(getSearchSuggestions("ma")).toEqual([]);
    expect(getSearchSuggestions("мар")).toBeInstanceOf(Array);
  });

  it("filters prompts by category", () => {
    const all = searchPrompts("");
    const filtered = filterByCategory(all, "development");
    expect(filtered.every((item) => item.category === "development")).toBe(true);
  });
});
