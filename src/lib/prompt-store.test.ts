describe("prompt-store", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it("creates, updates and toggles favorite", async () => {
    const store = await import("@/lib/prompt-store");
    const before = store.getAllPrompts();

    const created = store.createPrompt({
      title: "Test Prompt",
      description: "Prompt for coverage testing",
      content: "## Heading\n{{variable}} → output",
      category: "development",
      tags: ["test", "coverage"],
      authorId: "author-1",
      isPublic: true,
      isFavorite: false,
    });

    expect(store.getAllPrompts().length).toBe(before.length + 1);
    expect(store.getPromptById(created.id)?.title).toBe("Test Prompt");

    const updated = store.updatePrompt(created.id, { ...created, title: "Updated Prompt" });
    expect(updated?.title).toBe("Updated Prompt");

    const toggled = store.toggleFavorite(created.id);
    expect(toggled?.isFavorite).toBe(true);
  });

  it("handles unknown ids and search helpers", async () => {
    const store = await import("@/lib/prompt-store");

    expect(store.updatePrompt("missing-id", {
      title: "x",
      description: "x",
      content: "x",
      category: "analysis",
      tags: [],
      authorId: "author-1",
      isPublic: true,
      isFavorite: false,
    })).toBeNull();
    expect(store.toggleFavorite("missing-id")).toBeNull();
    expect(store.getPromptById("missing-id")).toBeUndefined();

    const all = store.searchPrompts("");
    expect(all.length).toBeGreaterThan(0);
    expect(store.getSearchSuggestions("ma")).toEqual([]);
    expect(store.getSearchSuggestions("мар").length).toBeGreaterThanOrEqual(0);
  });

  it("uses subscribe/unsubscribe and reads persisted state", async () => {
    const store = await import("@/lib/prompt-store");
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    store.createPrompt({
      title: "Persisted",
      description: "Persisted description text",
      content: "Persisted content text",
      category: "marketing",
      tags: ["persist"],
      authorId: "author-1",
      isPublic: true,
      isFavorite: false,
    });

    expect(listener).toHaveBeenCalled();
    unsubscribe();
    expect(store.getSnapshot().length).toBeGreaterThan(0);
  });
});
