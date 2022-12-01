import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./user";
import { experimentRouter } from "./experiment";
import { likeRouter } from "./like";
import { paperRouter } from "./paper";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  experiment: experimentRouter,
  like: likeRouter,
  paper: paperRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
