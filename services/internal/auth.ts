export interface SignUpData {
    name: string;
    email: string;
    password: string;
}
  
export interface SignInData {
    email: string;
    password: string;
}
  
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(data: SignUpData) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to sign up');
    }
  
    return res.json();
}
  

export async function signin(data: SignInData) {
    const res = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to sign in');
    }
  
    return res.json();
}