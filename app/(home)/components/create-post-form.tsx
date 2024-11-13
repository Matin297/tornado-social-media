"use client";

import { ZodError } from "zod";
import { createPost } from "../data";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState, FormEvent } from "react";
import LoadingButton from "@/components/loading-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Errors = {
  message?: string;
  content?: string[];
};

interface CreatePostFormElements extends HTMLFormControlsCollection {
  content: string;
}

interface CreatePostFormElement extends HTMLFormElement {
  elements: CreatePostFormElements;
}

export default function CreatePostForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<CreatePostFormElement>(null);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess() {
      setErrors({});
      formRef.current!.reset();
      toast({
        description: "Post created successfully!",
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError(error) {
      if (error instanceof ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        setErrors(error);
      }
    },
  });

  async function handleSubmit(event: FormEvent<CreatePostFormElement>) {
    event?.preventDefault();
    const formData = new FormData(event.currentTarget);
    createPostMutation.mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
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
      <LoadingButton
        pending={createPostMutation.isPending}
        type="submit"
        className="mt-4 w-full"
      >
        Publish
      </LoadingButton>
    </form>
  );
}
