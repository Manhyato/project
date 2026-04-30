import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBox } from "@/components/search-box";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("SearchBox", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("submits search query in URL", async () => {
    const user = userEvent.setup();
    render(<SearchBox />);

    await user.type(screen.getByLabelText("Поисковый запрос"), "маркетинг");
    await user.click(screen.getByRole("button", { name: "Запустить поиск" }));

    expect(pushMock).toHaveBeenCalledWith("/search?query=%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%D0%B8%D0%BD%D0%B3");
  });
});
