import { checkSessionAndRedirectIfInvalid } from "@/utils/helper";

export default async function Home() {
  await checkSessionAndRedirectIfInvalid("/");
  return (
    <main className="flex h-[91vh] flex-col items-center justify-between p-24">
      Hello
    </main>
  );
}
