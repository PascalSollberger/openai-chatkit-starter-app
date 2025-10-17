"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

// Playground options (keep theme object here if your internal ChatKitPanel forwards it differently)
const options = {
  api: { url: "/api/chat" },
  // Keep your full visual theme here for now (not passed to 'theme' prop directly)
  visualTheme: {
    colorScheme: "light",
    radius: "pill",
    density: "spacious",
    color: {
      accent: { primary: "#711adb", level: 1 },
      surface: { background: "#e31c1c", foreground: "#0f0f0f" },
    },
    typography: {
      baseSize: 18,
      fontFamily: "Lora, serif",
      fontSources: [
        {
          family: "Lora",
          src: "https://fonts.gstatic.com/s/lora/v37/0QIvMX1D_JOuMwr7I_FMl_E.woff2",
          weight: 400,
          style: "normal",
          display: "swap",
        },
      ],
    },
  },
  composer: {
    placeholder: "Test",
    attachments: { enabled: false },
    tools: [
      {
        id: "search_docs",
        label: "Search docs",
        shortLabel: "Docs",
        placeholderOverride: "Search documentation",
        icon: "book-open",
        pinned: false,
      },
    ],
  },
  startScreen: {
    greeting: "",
    prompts: [
      { icon: "circle-question", label: "What is ChatKit?", prompt: "What is ChatKit?" },
    ],
  },
} as const;

export default function App() {
  const { scheme, setScheme } = useColorScheme(); // likely "light" | "dark"

  const handleWidgetAction = useCallback((action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          // 👇 'theme' expects a scheme string, not the full object
          theme={scheme ?? "light"}
          api={options.api}
          composer={options.composer}
          startScreen={options.startScreen}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
          // If your ChatKitPanel supports passing full theme config, use a dedicated prop
          // e.g. appearance={options.visualTheme} or options={...}
          // appearance={options.visualTheme}
        />
      </div>
    </main>
  );
}
