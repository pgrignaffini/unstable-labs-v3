import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const experimentRouter = router({
    createExperiment: publicProcedure
        .input(z.object({
            tokenId: z.number().min(1),
        }))
        .mutation(({ ctx, input }) => {
            if (!ctx.session?.user) {
                new TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a project",
                })
            }
            return ctx.prisma.experiment.create({
                data: {
                    tokenId: input.tokenId,
                    creator: {
                        connect: {
                            id: ctx?.session?.user?.id,
                        },
                    },
                },
            })
        }),
    getExperimentLikes: publicProcedure
        .input(z.object({
            tokenId: z.number().min(1),
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.experiment.findUnique({
                where: {
                    tokenId: input.tokenId,
                },
                include: {
                    likes: true,
                },
            })
        }),
});
