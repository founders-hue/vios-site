import type { Metadata, Viewport } from "next";
import { ActiveStageProvider } from "@/components/motion/ActiveStageContext";
import SmoothScroll from "@/components/motion/SmoothScroll";
import TheatreStudioLoader from "@/components/dev/TheatreStudioLoader";
import LazyStageRenderer from "@/components/three/LazyStageRenderer";
import { WebGLProvider } from "@/components/three/WebGLContext";
import { DrawerProvider } from "@/components/ui/DrawerContext";
import LeadDrawer from "@/components/ui/LeadDrawer";
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
        <SmoothScroll>
          <DrawerProvider>
            <ActiveStageProvider>
              <WebGLProvider>
                <LazyStageRenderer />
                <div className="relative z-10">{children}</div>
              </WebGLProvider>
            </ActiveStageProvider>
            <LeadDrawer />
          </DrawerProvider>
        </SmoothScroll>
        <TheatreStudioLoader />
      </body>
    </html>
  );
}
