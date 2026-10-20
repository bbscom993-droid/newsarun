import { getUser } from "@netlify/identity";

export const ADMIN_ROLE = "admin";

/** Returns a 401/403 response when the caller is not a logged-in admin, otherwise null. */
export async function requireAdmin(): Promise<Response | null> {
  const user = await getUser();
  if (!user) return Response.json({ error: "Silakan login sebagai redaksi." }, { status: 401 });
  if (!user.roles?.includes(ADMIN_ROLE)) {
    return Response.json({ error: "Akun Anda belum memiliki akses redaksi (role admin)." }, { status: 403 });
  }
  return null;
}

export async function readJson<T = any>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

export const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);
