import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  response.headers.set("X-Your-Custom-Header", "A custom value");
  return response;
};

export const config = { path: "/submission" };
