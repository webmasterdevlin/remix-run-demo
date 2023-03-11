/*
 * Try to disable JavaScript of the browser and do reload to see
 * full server render. Proof is no fetch request in the network tab of chrome devtools. It is embedded in the HTML.
 * This is a fast server render.
 * */

import { useEffect, useRef } from "react";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import type {
  ActionFunction,
  DataFunctionArgs,
  LoaderFunction,
} from "@remix-run/node";
import { db } from "~/utils/db.server";
import { ToastContainer, toast } from "react-toastify";
import type { Todo } from "~/models/todos.model";

export const loader: LoaderFunction = async () => {
  console.log("todos:server");
  return await db.todo.findMany();
};

export const action: ActionFunction = async (args: DataFunctionArgs) => {
  const formData = await args.request.formData();
  const _action = formData.get("_action");
  const title = formData.get("title") as string;
  switch (_action) {
    case "create":
      // this can be put in another file
      // do remix-validated-form + zod here
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
  const { state, formData } = useNavigation();
  const notify = () => toast("NEW TASK ADDED");

  const titleRef = useRef<any>();

  const isAdding =
    state === "submitting" && formData.get("_action") === "create";

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
      <Form method="post" className="form">
        <section className="flex flex-col">
          <label className="capitalize" htmlFor="title">
            Title
          </label>
          <input
            className="field"
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
            className="btn btn--primary"
          >
            {isAdding ? "Adding" : "Create"}
          </button>
        </section>
        <ToastContainer />
      </Form>
      <section>
        {/*declarative mutation =)*/}
        {todos.map((t) => {
          return (
            <Form
              className="form"
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
                className="btn btn--secondary"
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
