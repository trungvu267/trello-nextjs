import { checkSessionAndRedirectIfInvalid } from "@/utils/helper";
import { Board, Column, Todo } from "./components/main";
export default async function Home() {
  await checkSessionAndRedirectIfInvalid("/");
  return (
    <main className="flex h-[91vh] flex-col items-center justify-between p-24">
      <Board />
    </main>
  );
}
