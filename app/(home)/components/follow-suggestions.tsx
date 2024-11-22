import { auth } from "@/auth";
import FollowUser from "./follow-user";
import { redirect } from "next/navigation";
import { fetchFollowSuggestions } from "../data";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default async function FollowSuggestions() {
  const session = await auth();
  const users = await fetchFollowSuggestions();

  if (!session || !session.user?.id) {
    redirect("/auth");
  }

  const userId = session.user.id;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <span className="text-sm">{user.name}</span>
              <FollowUser
                followerId={userId}
                followingId={user.id}
                followers={user.followers}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
