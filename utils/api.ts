interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
  cache?: RequestCache;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  const { method = 'GET', body, headers = {}, credentials, cache } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      credentials,
      cache,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  
    if (!response.ok) {
      const result = await response.json()
  
      throw new Error(result?.message || `Something went wrong: ${response.statusText}`);
    }

    return response.json() as T;
  } catch (error) {
    throw error;
  }
}