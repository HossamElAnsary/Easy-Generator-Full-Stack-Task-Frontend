export async function apiPost<T, R = any>(url: string, body: T): Promise<R> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const payload = await res.json();
  if (!res.ok) {
    const msg = payload?.message ?? JSON.stringify(payload);
    throw new Error(msg);
  }

  return payload as R;
}
