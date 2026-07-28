import type { Metadata } from "next";
import { googleSans } from "@/app/fonts/GoogleSans.font";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Creator",
  description: "Created by Kennedy Cordeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${googleSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
