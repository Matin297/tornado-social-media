import { PropsWithChildren } from "react";
import Navbar from "./components/navbar";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>Here goes main: {children}</main>
      <footer>Here goes footer</footer>
    </>
  );
}
