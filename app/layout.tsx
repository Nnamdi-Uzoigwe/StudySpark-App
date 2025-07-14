import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import { ToastProvider } from "@/components/ToastProvider";

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  display: 'swap',
})

export const metadata: Metadata = {
  title: "StudySpark App",
  description: "AI-Powered Course Recommendation Platform",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${jost.className} bg-[#202222] antialiased`}
      >
      <ClientLayout>
        {children}
        <ToastProvider />
      </ClientLayout>
      </body>
    </html>
  );
}
