// app/routes/_index.tsx
import type { MetaFunction } from "@remix-run/node";
import PomodoroTimer from "~/components/PomodoroTimer";

export const meta: MetaFunction = () => {
  return [
    { title: "MinPomo" },
    { name: "description", content: "Minimalistic Pomodoro Timer" },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl text-zinc-50 font-bold text-center mb-8">
        MinPomo
      </h1>
      <PomodoroTimer />
    </div>
  );
}