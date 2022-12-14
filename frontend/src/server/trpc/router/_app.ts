import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./user";
import { experimentRouter } from "./experiment";
import { likeRouter } from "./like";
import { paperRouter } from "./paper";
import { reviewRouter } from "./review";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  experiment: experimentRouter,
  like: likeRouter,
  paper: paperRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
