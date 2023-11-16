import { appRouter } from "~/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { db } from "~/server/db";
import superjson from "superjson";

export const generateServerSideHelper = () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: { db, auth: null! },
    transformer: superjson,
  });
};
