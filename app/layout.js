import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundMesh from "@/components/BackgroundMesh";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://cualli.bio"),
  title: {
    default: "Cualli | Filter the Forever",
    template: "%s | Cualli",
  },
  description:
    "Cualli engineers autonomous probiotics that sequester PFAS 'forever chemicals' in the gut before they enter your bloodstream. Next-generation synthetic biology therapeutics.",
  keywords: [
    "Cualli",
    "synthetic biology",
    "PFAS",
    "forever chemicals",
    "probiotic",
    "therapeutics",
    "EcN 1917",
  ],
  openGraph: {
    title: "Cualli | Filter the Forever",
    description:
      "Autonomous probiotics engineered to capture environmental toxins before they enter your bloodstream.",
    url: "https://cualli.bio",
    siteName: "Cualli",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative font-sans">
        <BackgroundMesh />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
