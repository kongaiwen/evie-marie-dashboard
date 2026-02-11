import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdminNav from "@/components/AdminNav";
import "../globals.scss";
import "../fonts.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin - Evie Marie Kolb",
  description: "Private admin dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AdminNav />
        {children}
      </body>
    </html>
  );
}
