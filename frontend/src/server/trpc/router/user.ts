import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
    updateClaim: publicProcedure
        .input(z.object({ id: z.string().min(1) }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    hasClaimedVials: true,
                },
            })
        }),
    getUser: publicProcedure
        .input(z.object({ id: z.string().min(1) }))
        .query(({ ctx, input }) => {
            return ctx.prisma.user.findUnique({
                where: {
                    id: input.id,
                }
            })
        }),
});