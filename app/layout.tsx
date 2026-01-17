import type { Metadata } from "next";
import { Space_Mono, VT323 } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "SYSTEM_READY: alt_cmd",
  description: "Minimalist Digital Matrix Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceMono.variable} ${vt323.variable} antialiased bg-black text-green-500 selection:bg-green-900 selection:text-green-100 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
