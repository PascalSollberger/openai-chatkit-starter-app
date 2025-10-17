'use client';
import { Chat } from '@openai/chatkit/react';
import type { ChatKitOptions } from '@openai/chatkit';

export default function App() {
  const options: ChatKitOptions = {
    api: {
      url: '/api/chat', // this points to your backend route on Vercel
    },
    theme: {
      colorScheme: 'light',     // "dark" also works
      radius: 'pill',           // "none", "sm", "md", "lg", "pill"
      density: 'spacious',      // "compact" or "spacious"
      color: {
        accent: {
          primary: '#711adb',   // your main brand color
          level: 1,
        },
        surface: {
          background: '#ffffff',  // chat background
          foreground: '#0f0f0f',  // text color
        },
      },
      typography: {
        baseSize: 16,
        fontFamily: 'Lora, serif',
        fontSources: [
          {
            family: 'Lora',
            src: 'https://fonts.gstatic.com/s/lora/v37/0QIvMX1D_JOuMwr7I_FMl_E.woff2',
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    composer: {
      placeholder: 'Frag mich etwas…',
      attachments: { enabled: false },
    },
    startScreen: {
      greeting: '👋 Willkommen! Wie kann ich helfen?',
      prompts: [
        { icon: 'circle-question', label: 'Was ist ChatKit?', prompt: 'Was ist ChatKit?' },
        { icon: 'rocket', label: 'Wie kann ich loslegen?', prompt: 'Wie starte ich ein Projekt?' },
      ],
    },
  };

  return <Chat options={options} />;
}
