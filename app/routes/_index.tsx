// app/routes/_index.tsx
import type { MetaFunction } from "@remix-run/node";
import PomodoroTimer from "~/components/PomodoroTimer";

export const meta: MetaFunction = () => {
  return [
    { title: "MinPomo" },
    { name: "description", content: "A minimalist Pomodoro timer" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <PomodoroTimer />
    </div>
  );
}