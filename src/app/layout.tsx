import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AeonX Digital — Joining Circular Generator",
  description: "Generate professional joining circulars for new employees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
