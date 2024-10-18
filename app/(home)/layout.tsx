import Navbar from "./components/navbar";
import { PropsWithChildren } from "react";
import Sidebar from "./components/sidebar";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="flex p-4 sm:gap-4">
        <aside>
          <Sidebar className="sticky top-2 hidden flex-col gap-1 p-2 sm:flex" />
        </aside>
        <section>Here goes main: {children}</section>
      </main>
      <footer className="p-4">Here goes footer</footer>
      <Sidebar className="sticky bottom-0 flex rounded-none border-x-0 sm:hidden" />
    </>
  );
}
