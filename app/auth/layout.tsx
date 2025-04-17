import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication Page",
    description: "Simple Authentication App",
};
  
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
        {children}
    </main>
  );
}