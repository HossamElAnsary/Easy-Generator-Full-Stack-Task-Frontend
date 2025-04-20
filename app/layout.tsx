import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider, User } from "@/contexts/AuthProvider";
import ToastProvider from "@/contexts/ToastProvider";
import { getToken, getUser } from "@/utils/session";

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

  let user: User | null = null;
  const token = await getToken();

  if(token) {
    user = await getUser(token);
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
