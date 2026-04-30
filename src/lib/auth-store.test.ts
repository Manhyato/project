describe("auth-store", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it("logs in, notifies subscribers and logs out", async () => {
    const { authStore } = await import("@/lib/auth-store");
    const listener = jest.fn();
    const unsubscribe = authStore.subscribe(listener);

    authStore.loginAsAuthor("author@example.com");
    expect(authStore.getSnapshot().role).toBe("author");
    expect(authStore.getSnapshot().name).toBe("author");
    expect(localStorage.getItem("prompthub_role_v1")).toBe("author");
    expect(listener).toHaveBeenCalledTimes(1);

    authStore.logout();
    expect(authStore.getSnapshot().role).toBe("guest");
    expect(localStorage.getItem("prompthub_role_v1")).toBe("guest");
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
  });

  it("restores author role from localStorage", async () => {
    localStorage.setItem("prompthub_role_v1", "author");
    const { authStore } = await import("@/lib/auth-store");
    expect(authStore.getSnapshot().role).toBe("author");
  });
});
