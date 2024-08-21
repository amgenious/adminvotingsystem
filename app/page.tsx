import { Button } from "@/components/ui/button";
import Voteanimation from "@/components/ui/voteanimation";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Voteanimation />
      <div className="bg-background text-foreground p-4 rounded flex flex-col gap-3 items-center">
      <h1 className="text-primary text-center text-xl font-semibold">Welcome to the Admin Section of the Voting System</h1>
      <Link href='/dashboard'>
        <Button className="w-fit">Dashboard</Button>
        </Link>
    </div>
    </main>
  );
}
