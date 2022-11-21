import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const likeRouter = router({
    addLike: publicProcedure
        .input(z.object({
            tokenId: z.number().min(1),
            userId: z.string().min(1),
        }))
        .mutation(({ ctx, input }) => {
            if (!ctx.session?.user) {
                new TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a project",
                })
            }
            return ctx.prisma.like.create({
                data: {
                    user: {
                        connect: {
                            id: ctx.session?.user?.id,
                        }
                    },
                    experiment: {
                        connect: {
                            tokenId: input.tokenId,
                        }
                    }
                }
            })
        }),
});