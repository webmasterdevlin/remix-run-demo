import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import type { Todo } from "@prisma/client";
import useLog from "~/hooks/useLog";

export const loader = async () => await db.todo.findMany();

export default function Todos() {
  const todos = useLoaderData<Todo[]>();

  return (
    <>
      <div>
        <h1>What's Next?</h1>
      </div>
      <ul>
        {todos.map((t) => {
          const time = t.completed ? null : new Date(t.createdAt);
          return (
            <div key={t.id}>
              <h2>
                {t.title} {t.completed ? "✅" : `❌ - ${time?.toDateString()}`}
              </h2>
            </div>
          );
        })}
      </ul>
    </>
  );
}
