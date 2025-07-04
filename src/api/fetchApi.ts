// src/api/fetchApi.ts
export async function fetchApi<T = any>(
  url: string,
  params?: Record<string, any>,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    method: "POST", // 필요하면 method도 options로 받을 수 있음
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    body: params ? JSON.stringify(params) : undefined,
    ...options,
  });
  if (!res.ok) throw new Error("API 호출 실패");
  return await res.json();
}
