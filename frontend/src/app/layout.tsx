import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/AiAssistant";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "EngineeringPath AI - MH Engineering Rank Predictor & College Recommender",
  description: "AI-powered MHT-CET rank prediction and college recommendation platform for Maharashtra engineering aspirants.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Floating Liquid Background Blobs */}
          <div className="liquid-blob blob-1"></div>
          <div className="liquid-blob blob-2"></div>
          <div className="liquid-blob blob-3"></div>

          <Navbar />
          {children}
          <Footer />
          <AiAssistant />
        </AuthProvider>
      </body>
    </html>
  );
}
