import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useSubmit } from "@remix-run/react";

export const action = async ({ request }: ActionArgs) => {
  console.log("--- Action ---");
  const form = await request.formData();
  let action = form.get("action");
  console.log({ action });

  if (action === "redirect") {
    let url = new URL(request.url);
    url.search = "";
    url.searchParams.set("test", Math.random().toString());
    return redirect(url.toString());
  } else {
    return "ok";
  }
};

export const loader = async ({ request, params }: LoaderArgs) => {
  console.log("--- Loader ---");
  return json("test");
};

export default function Index() {
  let fetcher = useFetcher();
  let submit = useSubmit();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Form, useSubmit and useFetcher scroll behavior.</h1>
      <div style={{ height: "100px" }}>
        <h2>Spacing 1</h2>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Spacing 2</h2>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Spacing 3</h2>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Spacing 4</h2>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Spacing 5</h2>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Spacing 6</h2>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Spacing 7</h2>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Form - JSON</h2>
        <Form method="post">
          <button name={"action"} value="json" type="submit">
            Submit
          </button>
        </Form>
      </div>
      <div style={{ height: "100px" }}>
        <h2>Form - Redirect</h2>
        <Form method="post">
          <button name={"action"} value="redirect" type="submit">
            submit
          </button>
        </Form>
      </div>
      <div style={{ height: "100px" }}>
        <h2>useSubmit - JSON</h2>
        <button
          onClick={() => {
            submit(new URLSearchParams({ action: "json" }), { method: "post" });
          }}
        >
          submit
        </button>
      </div>
      <div style={{ height: "100px" }}>
        <h2>useSubmit - Redirect</h2>
        <button
          onClick={() => {
            submit(new URLSearchParams({ action: "redirect" }), {
              method: "post",
            });
          }}
        >
          submit
        </button>
      </div>
      <div style={{ height: "100px" }}>
        <h2>fetcher.Form - JSON</h2>
        <fetcher.Form method="post">
          <button name={"action"} value="json" type="submit">
            Submit
          </button>
        </fetcher.Form>
      </div>
      <div style={{ height: "100px" }}>
        <h2>fetcher.Form - Redirect*</h2>
        <fetcher.Form method="post">
          <button name={"action"} value="redirect" type="submit">
            submit
          </button>
        </fetcher.Form>
      </div>
      <div style={{ height: "100px" }}>
        <h2>fetcher.submit - JSON</h2>
        <button
          name={"action"}
          value="redirect"
          onClick={() => {
            fetcher.submit(new URLSearchParams({ action: "json" }), {
              method: "post",
            });
          }}
        >
          submit
        </button>
      </div>
      <div style={{ height: "100px" }}>
        <h2>fetcher.submit - Redirect*</h2>
        <button
          name={"action"}
          value="redirect"
          onClick={() => {
            fetcher.submit(new URLSearchParams({ action: "redirect" }), {
              method: "post",
            });
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
}
