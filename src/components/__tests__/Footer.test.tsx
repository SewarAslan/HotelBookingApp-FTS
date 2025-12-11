import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../tests/test-utils";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders footer element", () => {
    renderWithProviders(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  test("renders the correct footer text with current year", () => {
    renderWithProviders(<Footer />);

    const year = new Date().getFullYear();
    const text = `© ${year} Smart Stays — All rights reserved.`;

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("applies primary color on Typography", () => {
    renderWithProviders(<Footer />);

    const footerText = screen.getByText(/Smart Stays/);

    expect(footerText).toBeVisible();
  });
});
