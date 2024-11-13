import { forwardRef } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
  pending: boolean;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  function LoadingButtonComponent({ pending, disabled, ...props }, ref) {
    return (
      <Button ref={ref} {...props} disabled={pending || disabled}>
        {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {props.children}
      </Button>
    );
  },
);

export default LoadingButton;
