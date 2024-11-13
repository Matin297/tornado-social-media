import { z } from "zod";

export const CreatePostSchema = z.object({
  content: z.string().min(1, "Content is required!"),
});
