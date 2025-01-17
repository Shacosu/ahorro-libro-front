import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { fontSans } from "@/config/fonts";
import { clsx } from "clsx";
import { Metadata } from "next";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    template: "%s | Ahorro Libro",
    default: "Ahorro Libro",
  },
  description: "Tu plataforma de confianza para encontrar los mejores precios en libros.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es" className="!p-0">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased text-[14px]", fontSans.variable)}>
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
