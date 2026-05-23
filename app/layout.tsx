import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vios.au"),
  title: {
    default: "VIOS Group",
    template: "%s · VIOS Group",
  },
  description: "Immersive Intelligence for luxury real estate.",
  openGraph: {
    title: "VIOS Group",
    description: "Immersive Intelligence for luxury real estate.",
    url: "https://vios.au",
    siteName: "VIOS Group",
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
