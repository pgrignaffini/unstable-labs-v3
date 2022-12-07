import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const likeRouter = router({
    addExperimentLike: publicProcedure
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
    addPaperLike: publicProcedure
        .input(z.object({
            paperId: z.number().min(1),
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
                    paper: {
                        connect: {
                            id: input.paperId,
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
    getPaperLikesCount: publicProcedure
        .input(z.object({
            paperId: z.number().min(1),
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.like.count({
                where: {
                    paperId: input.paperId,
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
    getUserPaperLikes: publicProcedure
        .input(z.object({
            paperId: z.number().min(1),
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
                        paperId: input.paperId,
                    }
                },
            })
        }),

});