import Logout from "./logout";
import Search from "./search";
import Profile from "./profile";

export default function Navbar() {
  return (
    <header className="flex items-center gap-1 border-b px-4 py-2">
      <h1 className="font-bold sm:text-3xl">Tornado</h1>
      <Search className="mx-auto" />
      <Profile />
      <Logout className="hidden sm:block" />
    </header>
  );
}
