import { apiRequest } from "@/utils/api";

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}
  
export interface SignInData {
    email: string;
    password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export async function signup(data: SignUpData): Promise<any> {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: data,
  });
}

export async function signin(data: SignInData): Promise<{ accessToken: string }> {
  return apiRequest('/auth/signin', {
    method: 'POST',
    body: data,
    credentials: 'include',
  });
}

export async function getUserProfile(token: string): Promise<UserProfile> {
  return apiRequest('/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });
}