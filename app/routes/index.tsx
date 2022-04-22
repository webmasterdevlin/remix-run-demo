import prisma from "~/lib/db.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => await prisma.todo.findMany();

export default function Index() {
  const todos = useLoaderData<TodoModel[]>();
  return (
    <>
      <div>
        <h1>What's Next?</h1>
      </div>
      <ul>
        {todos.map((t) => (
          <div key={t.id}>
            <h2>
              {t.title} {t.completed ? "✅" : "❌"}
            </h2>
          </div>
        ))}
      </ul>
    </>
  );
}

export type TodoModel = {
  id: number;
  title: string;
  completed: boolean;
};
