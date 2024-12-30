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
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "theme-color", content: "#ffffff" },
  ];
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-neutral-950">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}