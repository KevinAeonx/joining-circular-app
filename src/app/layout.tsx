import type { Metadata } from "next";
import "./globals.css";
import AppNav from "@/components/AppNav";

export const metadata: Metadata = {
  title: "AeonX Digital — HR Tools",
  description: "Joining circulars, birthday cards, and anniversary cards for AeonX Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppNav />
        {children}
      </body>
    </html>
  );
}
