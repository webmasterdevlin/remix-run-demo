import { render, screen } from "../../../test/testing-library-utils";
import userEvent from "@testing-library/user-event";
import HomePage from "../__main/index";

describe("Heroes Page", () => {
  beforeEach(() => {});

  it("should render title", async () => {
    render(<HomePage />);

    const title = await screen.findByRole("heading", { name: /remix run/i });
    expect(title).toBeInTheDocument();
  });

  it("should increment count", async () => {
    render(<HomePage />);

    const button = await screen.findByRole("button", { name: /click me/i });
    const count = await screen.findByText(/count: 0/i);

    expect(count).toBeInTheDocument();
    expect(count).toHaveTextContent(/count: 0/i);

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const newCount = await screen.findByText(/count: 1/i);
    expect(newCount).toBeInTheDocument();
  });
});
