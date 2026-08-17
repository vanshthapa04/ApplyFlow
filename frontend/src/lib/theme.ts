export type Theme = "light" | "dark";

export function getTheme(): Theme {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    return "dark";
  }

  return "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem("theme", theme);
}

export function toggleTheme(): Theme {
  const currentTheme = getTheme();

  const newTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  applyTheme(newTheme);

  return newTheme;
}