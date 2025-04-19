import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";
import { cookies } from "next/headers";
import ToastProvider from "@/contexts/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy-Generator Full-Stack-Task",
  description: "Simple Authentication App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let user = null;
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value;

  if(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',            // always fresh
      credentials: 'include',       // if your API expects cookies
    })

    user = await res.json();
  }
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ddd]`}
      >
        <AuthProvider initialUser={user}>
          <ToastProvider>
            <main className="min-h-screen bg-gray-50 text-gray-900">
              {children}
            </main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
