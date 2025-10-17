"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

// --- Playground options (safe, plain JS object) ---
const options = {
  api: {
    url: "/api/chat", // your server route
  },
  theme: {
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
      // add more tools if needed
    ],
  },
  startScreen: {
    greeting: "",
    prompts: [
      { icon: "circle-question", label: "What is ChatKit?", prompt: "What is ChatKit?" },
      // add more prompts if needed
    ],
  },
} as const;

export default function App() {
  const { scheme, setScheme } = useColorScheme();

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
          api={options.api}
          theme={options.theme}               // you can swap to 'scheme' if your hook returns a full theme object
          composer={options.composer}
          startScreen={options.startScreen}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
