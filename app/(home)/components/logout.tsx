import { cn } from "@/lib/utils";
import { signOut } from "../actions";
import SubmitButton from "@/components/submit-button";

interface LogoutProps {
  className?: string;
}

export default function Logout({ className }: LogoutProps) {
  return (
    <form action={signOut} className={cn(className)}>
      <SubmitButton className="w-full" variant="ghost" size="sm">
        SignOut
      </SubmitButton>
    </form>
  );
}
