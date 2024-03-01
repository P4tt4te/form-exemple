import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log("resquest", request);
  const response = await context.next();
  console.log("response", response);
  response.headers.set("X-Your-Custom-Header", "A custom value");
  return response;
};

export const config = { path: "/submission" };
