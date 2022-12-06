import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const paperRouter = router({
    createPaper: publicProcedure
        .input(z.object({
            title: z.string().min(1).max(100),
            text: z.string().min(1),
            tokenId: z.number().min(1),
        }))
        .mutation(({ ctx, input }) => {
            if (!ctx.session?.user) {
                new TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to publish a paper",
                })
            }
            return ctx.prisma.paper.create({
                data: {
                    title: input.title,
                    text: input.text,
                    experiment: {
                        connect: {
                            tokenId: input.tokenId,
                        }
                    },
                    user: {
                        connect: {
                            id: ctx?.session?.user?.id,
                        },
                    },
                },
            })
        }),
    getUserPapers: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.paper.findMany({
                where: {
                    userId: ctx.session?.user?.id,
                },
                include: {
                    experiment: true,
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        }),
    getAllPapers: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.paper.findMany({
                include: {
                    experiment: true,
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        }),
    getNumberOfPapers: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.paper.count()
        }),
    getPaginatedPapers: publicProcedure
        .input(z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        }))
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 8;
            const { cursor } = input;
            const papers = await ctx.prisma.paper.findMany({
                include: {
                    experiment: true,
                    user: true,
                },
                orderBy: {
                    id: "desc",
                },
                take: limit + 1,
                cursor: cursor ? { id: cursor } : undefined,
            })
            let nextCursor, prevCursor: typeof cursor | undefined = undefined;
            if (papers.length > limit) {
                const nextItem = papers.pop()
                nextCursor = nextItem!.id;
            }
            if (papers.length > 0) {
                const prevItem = papers[0]
                if (prevItem!.id > limit) {
                    prevCursor = prevItem!.id - limit;
                } else {
                    prevCursor = 1;
                }
            }
            return {
                papers,
                nextCursor,
                prevCursor,
            };
        })
});
