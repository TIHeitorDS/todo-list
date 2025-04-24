import { useContext } from "react";
import { ThemeContextType } from "../lib/definitions";
import { ThemeContext } from "../contexts/ThemeProvider";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
