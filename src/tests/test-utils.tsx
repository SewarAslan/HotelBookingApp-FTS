import { ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { lightTheme } from "../styles/theme";

export function renderWithTheme(ui: React.ReactNode) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}
