"use client";

import { useStore } from "@/store/useStore";

export default function Home() {
  const [count, setCount] = useStore((state) => [state.count, state.setCount]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {count}
      <button onClick={setCount}>Update count</button>
    </main>
  );
}
