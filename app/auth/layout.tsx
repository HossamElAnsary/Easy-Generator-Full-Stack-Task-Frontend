import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in or sign up to your account',
  robots: { index: false, follow: false },
};
  
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card>{children}</Card>
    </main>
  );
}