import type { Metadata } from "next";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import { ToastContainer } from "react-toastify";
import { LoginProvider } from "@/context/LoginContext";
import 'react-toastify/dist/ReactToastify.min.css'

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
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
        </body>
      </LoginProvider>
    </html>
  );
}
