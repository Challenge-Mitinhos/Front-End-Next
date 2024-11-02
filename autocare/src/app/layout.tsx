import type { Metadata } from "next";
import "./globals.css";
import { LoginProvider } from "@/context/LoginContext";

export const metadata: Metadata = {
  title: "AutoCare",
  description: "Desenvolvido por Mikael, o Brabo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LoginProvider>
        <body>
          {children}
        </body>
      </LoginProvider>
    </html>
  );
}
