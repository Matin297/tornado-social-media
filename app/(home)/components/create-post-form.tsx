"use client";

import { publishPost } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/submit-button";

type Errors = {
  message?: string;
  content?: string[];
};

export default function CreatePostForm() {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function publish(formData: FormData) {
    setErrors({});

    const result = await publishPost(formData);

    if (result?.message) {
      setErrors({
        message: result.message,
        ...(result.errors ?? {}),
      });
    } else {
      toast({ description: "Post publish successfully!" });
      formRef.current!.reset();
    }
  }

  return (
    <form action={publish} ref={formRef}>
      {errors.message && (
        <p className="mb-2 text-sm text-destructive">{errors.message}</p>
      )}
      <div className="space-y-1">
        <label htmlFor="post-content">Post Content</label>
        <Textarea
          rows={1}
          name="content"
          id="post-content"
          className="resize-none"
          placeholder="Wassa-Matta-You Altair?"
        ></Textarea>
        <p className="text-sm text-destructive">
          {errors.content && errors.content.join(",")}
        </p>
      </div>
      <SubmitButton className="mt-4 w-full">Publish</SubmitButton>
    </form>
  );
}
