/** 200 JSON success response. */
export function jsonOk(): Response {
  return Response.json({ ok: true });
}

/** JSON error response with a client-safe, generic message. */
export function jsonError(status: number, message: string): Response {
  return Response.json({ ok: false, error: message }, { status });
}
