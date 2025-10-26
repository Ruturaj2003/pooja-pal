import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  dotex: baseProcedure.query(async () => {
    const users = await db.select().from(usersTable);

    if (!users) {
      return;
    }

    return users;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
