// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function meta() {
  return [
    { title: "MinPomo" },
    { name: "description", content: "Minimalistic Pomodoro Timer" },
    { name: "viewport", content: "width=device-width,initial-scale=1,maximum-scale=1" },
    { name: "theme-color", content: "#18181b" },
  ];
}

export default function App() {
  return (
    <html lang="en" className="h-full font-mono">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-full bg-zinc-900 font-mono flex flex-col">
        <main className="flex-grow">
          <Outlet />
        </main>
        <footer className="py-4 text-center text-zinc-500 text-sm">
          <a 
            href="https://fool.ltd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            Created by fool739
          </a>
          <span className="mx-2">•</span>
          <a 
            href="https://github.com/foot739/MinPomo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}