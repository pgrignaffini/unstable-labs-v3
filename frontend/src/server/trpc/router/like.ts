import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const likeRouter = router({
    addLike: publicProcedure
        .input(z.object({
            tokenId: z.number().min(1),
        }))
        .mutation(({ ctx, input }) => {
            if (!ctx.session?.user) {
                new TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to add a like",
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
    getExperimentLikesCount: publicProcedure
        .input(z.object({
            tokenId: z.number().min(1),
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.like.count({
                where: {
                    tokenId: input.tokenId,
                }
            })
        }),
    getUserExperimentLikes: publicProcedure
        .input(z.object({
            tokenId: z.number().min(1),
        }))
        .query(({ ctx, input }) => {
            if (!ctx.session?.user) {
                new TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to get your likes",
                })
            }
            return ctx.prisma.like.findFirst({
                where: {
                    userId: ctx.session?.user?.id,
                    AND: {
                        tokenId: input.tokenId,
                    }
                },
            })
        }),

});