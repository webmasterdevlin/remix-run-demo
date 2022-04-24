/*
 * Try to disable JavaScript of the browser and do reload to see
 * full server render. Proof is no fetch request in the network tab of chrome devtools. It is embedded in the HTML.
 * This is a fast server render.
 * */

import { db } from "~/utils/db.server";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import type { Todo } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useEffect, useRef } from "react";

export const loader: LoaderFunction = async () => await db.todo.findMany();

export const action: ActionFunction = async (args) => {
  const formData = await args.request.formData();
  const _action = formData.get("_action");
  const title = formData.get("title") as string;

  switch (_action) {
    case "create":
      // this can be put in another file
      return await db.todo.create({
        data: {
          title: title,
          completed: false,
        },
      });

    case "delete":
      const id = formData.get("id") as string;
      return await db.todo.delete({ where: { id } });
  }
};

export default function Todos() {
  const todos = useLoaderData<Todo[]>();
  const { state, submission } = useTransition();

  const titleRef = useRef<any>();

  const isAdding =
    state === "submitting" && submission.formData.get("_action") === "create";

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
      {/*does revalidation after the post to sync data with the UI*/}
      <Form method="post">
        <div>
          <label htmlFor="title">Title</label>
        </div>
        <input
          id="title"
          name="title"
          type="text"
          ref={titleRef}
          required
          maxLength={20}
        />
        <button disabled={isAdding} type="submit" name="_action" value="create">
          {isAdding ? "Adding" : "Create"}
        </button>
      </Form>
      <li>
        {/*declarative mutation =)*/}
        {todos.map((t) => {
          return (
            <Form
              method="post"
              key={t.id}
              style={{ display: "flex", gap: "1rem", alignItems: "center" }}
            >
              <h2>{t.title}</h2>
              <input type="hidden" name="id" value={t.id} />
              <button type="submit" name="_action" value="delete">
                ✔️
              </button>
            </Form>
          );
        })}
      </li>
    </>
  );
}
