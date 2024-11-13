"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import LoadingButton from "./loading-button";
import { ButtonProps } from "./ui/button";

const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function SubmitButtonComponent(props, ref) {
    const { pending } = useFormStatus();

    return <LoadingButton ref={ref} {...props} pending={pending} />;
  },
);

export default SubmitButton;
