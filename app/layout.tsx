import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://firstlightai.co.uk"),
  title: {
    default: "FirstLight AI | AI Automation Consultancy UK",
    template: "%s | FirstLight AI",
  },
  description:
    "FirstLight AI helps UK businesses reduce admin, clean up messy workflows and build practical AI automation systems. Based in Liverpool.",
  keywords: [
    "FirstLight AI",
    "AI automation consultancy UK",
    "AI consultancy Liverpool",
    "workflow automation",
    "business process automation",
    "practical AI systems",
    "admin automation",
    "AI agency UK",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FirstLight AI | AI Automation Consultancy UK",
    description:
      "Practical AI systems for clearer businesses. Reduce admin, clean up messy workflows and automate the work that slows teams down.",
    url: "https://firstlightai.co.uk",
    siteName: "FirstLight AI",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstLight AI | AI Automation Consultancy UK",
    description:
      "FirstLight AI helps UK businesses reduce admin, improve workflows and build practical AI automation systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirstLight AI",
  url: "https://firstlightai.co.uk",
  email: "hello@firstlightai.co.uk",
  founder: {
    "@type": "Person",
    name: "Ryan Fleming",
  },
  areaServed: "United Kingdom",
  description:
    "FirstLight AI helps UK businesses reduce admin, clean up messy workflows and build practical AI automation systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
