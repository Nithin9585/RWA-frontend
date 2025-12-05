import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Diamond RWA Yield Engine",
  description: "Premium UI for the Diamond RWA Yield Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text antialiased min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-bg to-bg">
        <Providers>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
