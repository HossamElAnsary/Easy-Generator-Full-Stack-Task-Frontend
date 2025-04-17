import { AuthContext } from "@/contexts/AuthProvider";
import { API_URL } from "@/utils/api";
import { SignUpInputs } from "@/utils/schemas/auth";
import { useContext } from "react";

export function useAuth() {
    const { login } = useContext(AuthContext)!;

    const signUp = async (data: SignUpInputs) => {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Sign‑up failed');
      }
      
      const user = await res.json();
      
      const { access_token } = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      }).then(r => r.json());

      login({ token: access_token, user });
    };
    
    return { signUp };
  }
  