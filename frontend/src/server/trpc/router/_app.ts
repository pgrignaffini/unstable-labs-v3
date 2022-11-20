import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./user";
import { experimentRouter } from "./experiment";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  experiment: experimentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
