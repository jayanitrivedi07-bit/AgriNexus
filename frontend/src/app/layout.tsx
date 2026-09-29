import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata = {
  title: "AgriNexus | Digital Agriculture Intelligence",
  description: "Connect satellite data, soil intelligence, weather insights and AI-powered recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased bg-bg text-text-primary`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
