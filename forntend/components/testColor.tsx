"use client";

import { useTheme } from "next-themes";

export default function ColorTest() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Mapping Colors
  const colors = {
    bg: isDark ? "darkBg" : "lightBg",
    surface: isDark ? "darkSurface" : "lightSurface",
    card: isDark ? "darkCard" : "lightCard",
    textPrimary: isDark ? "darkTextPrimary" : "lightTextPrimary",
    textSecondary: isDark ? "darkTextSecondary" : "lightTextSecondary",
    textMuted: isDark ? "darkTextMuted" : "lightTextMuted",
    border: isDark ? "darkBorder" : "lightBorder",
    buttonPrimary: isDark ? "darkButtonPrimary" : "lightButtonPrimary",
    buttonPrimaryHover: isDark
      ? "darkButtonPrimaryHover"
      : "lightButtonPrimaryHover",
    buttonText: isDark ? "darkButtonText" : "lightButtonText",
    success: isDark ? "darkSuccess" : "lightSuccess",
    warning: isDark ? "darkWarning" : "lightWarning",
    error: isDark ? "darkError" : "lightError",
    info: isDark ? "darkInfo" : "lightInfo",
  };

  return (
    <div
      className={`${colors.bg} min-h-screen p-8 transition-colors duration-300`}
    >
      <button
        className={`mb-8 px-4 py-2 rounded font-semibold border ${colors.buttonPrimary} ${colors.buttonPrimaryHover} ${colors.buttonText}`}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        Toggle {isDark ? "Light" : "Dark"} Mode
      </button>

      {/* Test Background & Surface */}
      <div className={`${colors.surface} p-6 rounded shadow mb-8`}>
        <h1 className={`${colors.textPrimary} text-2xl font-bold`}>
          Surface Test
        </h1>
        <p className={`${colors.textSecondary}`}>Text Primary & Secondary</p>
        <p className={`${colors.textMuted}`}>Muted Text</p>
      </div>

      {/* Test Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {["Card 1", "Card 2", "Card 3"].map((title) => (
          <div
            key={title}
            className={`${colors.card} p-6 rounded shadow border ${colors.border}`}
          >
            <h2 className={`${colors.textPrimary} text-xl font-bold mb-2`}>
              {title}
            </h2>
            <p className={`${colors.textSecondary}`}>Some example text</p>
          </div>
        ))}
      </div>

      {/* Test Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${colors.buttonPrimary} ${colors.buttonPrimaryHover} ${colors.buttonText}`}
        >
          Primary
        </button>
        <button
          className={`px-4 py-2 rounded border ${colors.border} ${colors.textPrimary}`}
        >
          Secondary
        </button>
      </div>

      {/* Test Status Colors */}
      <div className="flex gap-4">
        <div className={`px-4 py-2 rounded ${colors.success} text-white`}>
          Success
        </div>
        <div className={`px-4 py-2 rounded ${colors.warning} text-white`}>
          Warning
        </div>
        <div className={`px-4 py-2 rounded ${colors.error} text-white`}>
          Error
        </div>
        <div className={`px-4 py-2 rounded ${colors.info} text-white`}>
          Info
        </div>
      </div>
    </div>
  );
}
