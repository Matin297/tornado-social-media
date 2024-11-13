import { Prisma } from "@prisma/client";

export const userIncludedPayload = {
  user: {
    select: {
      name: true,
      image: true,
      email: true,
    },
  },
};

export type PostWithUser = Prisma.PostGetPayload<{
  include: typeof userIncludedPayload;
}>;
