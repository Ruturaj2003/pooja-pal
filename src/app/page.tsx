import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { HydrateClient, trpc } from "@/trpc/server";
import TestComponent from "./test-comp";

export default async function Home() {
  void trpc.hello.prefetch({
    text: "Ray",
  });
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  return (
    <HydrateClient>
      <TestComponent></TestComponent>
    </HydrateClient>
  );
}
