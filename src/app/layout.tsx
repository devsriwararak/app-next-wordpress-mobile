import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "./components/layouts/Header";
import { ToastContainer } from 'react-toastify';


const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "รื่นรมย์ มือถือ ขอนแก่น",
  description: "รื่นรมย์ มือถือ ขอนแก่น",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${prompt.variable} `}
      >
        <ToastContainer theme="colored" autoClose={2000} />

        {children}
      </body>
    </html>
  );
}
