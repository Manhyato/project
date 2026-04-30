import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/login/page";
import { authStore } from "@/lib/auth-store";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("Login page", () => {
  beforeEach(() => {
    pushMock.mockClear();
    authStore.logout();
  });

  it("validates required fields and logs in author", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole("button", { name: "Войти в профиль" }));
    expect(await screen.findByText("Введите корректный email")).toBeInTheDocument();
    expect(await screen.findByText("Пароль обязателен")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Email"), "author@example.com");
    await user.type(screen.getByLabelText("Пароль"), "secret");
    await user.click(screen.getByRole("button", { name: "Войти в профиль" }));

    expect(authStore.getSnapshot().role).toBe("author");
    expect(pushMock).toHaveBeenCalledWith("/profile");
  });
});
