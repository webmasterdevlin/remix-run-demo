/*
 * Try to disable JavaScript of the browser and do reload to see
 * full server render. Proof is no fetch request in the network tab of chrome devtools. It is embedded in the HTML.
 * This is a fast server render.
 * */

import { useEffect, useRef } from "react";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { Todo } from "@prisma/client";
import { db } from "~/utils/db.server";
import { ToastContainer, toast } from "react-toastify";

export const loader: LoaderFunction = async () => {
  console.log("todos:server");
  return await db.todo.findMany();

  // for tests of revaluation
  return [
    {
      id: "94f92ac7-cf82-4613-8fa4-8172f80654aa",
      title: "code",
      completed: false,
      createdAt: "2022-08-12T04:34:46.164Z",
      updatedAt: "2022-08-12T04:34:46.164Z",
    },
    {
      id: "cb320983-978a-4f87-9a9b-14bb0fb2e9db",
      title: "sleep",
      completed: false,
      createdAt: "2022-08-12T04:34:48.247Z",
      updatedAt: "2022-08-12T04:34:48.248Z",
    },
    {
      id: "e2e28304-d3a3-4592-b342-a08b108fa0cf",
      title: "eat",
      completed: false,
      createdAt: "2022-08-12T04:34:53.502Z",
      updatedAt: "2022-08-12T04:34:53.503Z",
    },
  ];
};

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
  const notify = () => toast("NEW TASK ADDED");

  const titleRef = useRef<any>();

  const isAdding =
    state === "submitting" && submission?.formData.get("_action") === "create";

  useEffect(() => {
    console.log("todos:client");
    if (isAdding) {
      notify();
      titleRef.current.value = "";
    }
  }, [isAdding]);

  return (
    <>
      <div>
        <h1>What's Next?</h1>
      </div>
      {/*does revalidation after the post to sync data with the UI*/}
      <Form method="post" className={"form-control"}>
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
        <button
          disabled={isAdding}
          type="submit"
          name="_action"
          value="create"
          className={"btn"}
        >
          {isAdding ? "Adding" : "Create"}
        </button>
        <ToastContainer />
      </Form>
      <section>
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
              <button
                type="submit"
                name="_action"
                value="delete"
                className={"btn-delete"}
              >
                ✔️
              </button>
            </Form>
          );
        })}
      </section>
    </>
  );
}
