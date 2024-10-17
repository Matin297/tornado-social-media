"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "./ui/button";

const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function SubmitButtonComponent(props, ref) {
    const { pending } = useFormStatus();

    return (
      <Button
        ref={ref}
        {...props}
        type="submit"
        disabled={pending || props.disabled}
      >
        {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {props.children}
      </Button>
    );
  },
);

export default SubmitButton;
