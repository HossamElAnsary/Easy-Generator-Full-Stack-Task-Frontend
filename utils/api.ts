
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',             // e.g. http://localhost:5001
  withCredentials: true,                    // send cookies
  headers: { 'Content-Type': 'application/json' },
});

export default api;
