'use client'
import { TodoList } from "@/components";
import { Header } from "@/shared/components";

export default function Home() {

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="w-full h-full flex justify-center p-8">
          <div className="w-full h-full lg:w-[40%] lg:h-1/2">
            <TodoList />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
