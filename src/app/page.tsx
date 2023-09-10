import { checkSessionAndRedirectIfInvalid } from "@/utils/helper";
import { Board } from "./components/main";
import dynamic from "next/dynamic";
import CreateTodoModal from "./components/CreateTodoModal";

export default async function Home() {
  // await checkSessionAndRedirectIfInvalid("/");
  return (
    <main className="flex flex-col items-center justify-between p-24 h-screen ">
      {/* <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-[#0055D1] to-pink-400 rounded-md filter blur-3xl opacity-50 -z-50" /> */}
      <Board />
      <CreateTodoModal />
    </main>
  );
}
