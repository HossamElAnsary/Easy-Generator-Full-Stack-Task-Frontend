
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const apiRequest = async <TResponse>(
    url: string,
    method: HttpMethod,
    body?: unknown
  ): Promise<TResponse> => {
    
    try {
      const response = await fetch(`${API_URL}/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        const error = await response.json()
  
        throw new Error(error?.message || `Something went wrong: ${response.statusText}`);
      }
  
      return response.json();
    } catch (error) {
      throw error;
    }
    
  };