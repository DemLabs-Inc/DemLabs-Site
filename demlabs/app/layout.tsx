import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DemLabs",
  description: "Innovating The Future of Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ClerkProvider>
    <html lang="en" className="dark">  
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
   </ClerkProvider>    
  );
}
