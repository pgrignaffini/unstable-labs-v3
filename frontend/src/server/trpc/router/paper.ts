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
                    message: "You must be logged in to create a project",
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
});
