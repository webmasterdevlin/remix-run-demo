import { db } from "~/utils/db.server";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import type { Todo } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useEffect, useRef } from "react";

export const loader: LoaderFunction = async () => await db.todo.findMany();

export const action: ActionFunction = async (args) => {
  const formData = await args.request.formData();
  const title = formData.get("title") as string;

  return await db.todo.create({
    data: {
      title: title,
      completed: false,
    },
  });
};

export default function Todos() {
  const todos = useLoaderData<Todo[]>();
  const transition = useTransition();

  const titleRef = useRef<any>();

  const isAdding = transition.state === "submitting";

  useEffect(() => {
    if (isAdding) {
      titleRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <>
      <div>
        <h1>What's Next?</h1>
      </div>
      <ul>
        {todos.map((t) => {
          return (
            <div key={t.id}>
              <h2>{t.title}</h2>
            </div>
          );
        })}
      </ul>
      <Form method="post">
        <div>
          <label htmlFor="title">Title</label>
        </div>
        <input id="title" name="title" type="text" ref={titleRef} />
        <button type="submit">Add</button>
      </Form>
    </>
  );
}
