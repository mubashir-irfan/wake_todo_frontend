'use client';
import LocaleSwitcher from '@/shared/components/LocaleSwitcher';
import { Header, TodoList } from './_components';
import { ThemeSwitcher } from '@/shared/components';

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
      <footer className="flex gap-6 flex-wrap items-center justify-center py-4">
        <ThemeSwitcher />
        <LocaleSwitcher />
      </footer>
    </div>
  );
}
