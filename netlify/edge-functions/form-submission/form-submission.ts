import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const data = await request.formData();
  const errors = { username: "", email: "", message: "" };

  const name = data.get("Name");
  const email = data.get("Email");
  const message = data.get("Message");
  console.log("edge : ", name, email, message);
  let hasErrors = false;

  if (typeof name !== "string" || name.length < 3) {
    hasErrors = true;
    errors.username += "Votre nom doit faire au moins 3 caractères. ";
  }
  if (typeof email !== "string") {
    hasErrors = true;
    // TODO: implement an SSR valid email function
    errors.username += "Votre email n'est pas valide. ";
  }
  if (typeof message !== "string" || message.length < 6) {
    hasErrors = true;
    errors.message += "Votre message doit faire au moins 6 caractères. ";
  }

  if (!hasErrors) {
    await fetch(
      "https://script.google.com/macros/s/AKfycbyzMLUU3C_pcLyXmnHIs5INF6iUDmgFv0XA4mAx7NZW1K58DAmTXQDmbEQ4y6LVja0/exec",
      {
        body: data,
        method: "POST",
      }
    ).then((value) => console.log("response : ", value));
  }

  return context.next(new Request(request, { body: JSON.stringify(errors) }));
};

export const config = { path: "/submission" };
