import { Button } from "@/components/ui/button";
import { client, db } from "@/db";
import { usersTable } from "@/db/schema";


export default async function Home() {
  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  

return (
  <div className="bg-teal-300 h-40 w-full">
    <Button variant="ghost">
    Hi
    </Button>
     
  </div>
);
}