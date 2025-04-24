export type Task = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  status: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[];
};

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
