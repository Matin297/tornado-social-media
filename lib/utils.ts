import { clsx, type ClassValue } from "clsx";
import { MutableRefObject, RefCallback, RefObject } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeRefs<Instance>(
  ...refs: (null | MutableRefObject<Instance> | RefCallback<Instance>)[]
) {
  return (instance: Instance) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref !== null) {
        ref.current = instance;
      }
    });
  };
}
