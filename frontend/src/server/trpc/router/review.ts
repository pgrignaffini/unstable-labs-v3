import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const reviewRouter = router({
    createReview: publicProcedure
        .input(z.object({
            paperId: z.number().min(1),
            text: z.string().min(1),
        }))
        .mutation(({ ctx, input }) => {
            if (!ctx.session?.user) {
                new TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to post a review",
                })
            }
            return ctx.prisma.review.create({
                data: {
                    text: input.text,
                    user: {
                        connect: {
                            id: ctx?.session?.user?.id,
                        },
                    },
                    paper: {
                        connect: {
                            id: input.paperId,
                        },
                    }
                },
            })
        }),
    getUserReviews: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.review.findMany({
                where: {
                    userId: ctx.session?.user?.id,
                },
                include: {
                    paper: true,
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        }),
    getPaperReviews: publicProcedure
        .input(z.object({
            paperId: z.number().min(1),
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.review.findMany({
                where: {
                    paperId: input.paperId,
                },
                include: {
                    paper: true,
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        }),
    getPaperReviewCount: publicProcedure
        .input(z.object({
            paperId: z.number().min(1),
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.review.count({
                where: {
                    paperId: input.paperId,
                }
            })
        }
        ),
});
