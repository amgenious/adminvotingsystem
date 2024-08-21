import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});


export const metadata: Metadata = {
  title: "Admin | Voting System",
  description: "Admin Section of Voting System",
  icons:{
    icon:'icon.png'
 }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
            <SignedOut>
            <div className="flex h-screen justify-center items-center">
            <SignIn routing="hash" />
          </div>
          </SignedOut>
          <SignedIn>
            {children}
          </SignedIn>
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
