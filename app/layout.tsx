import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://firstlightai.co.uk"),
  title: {
    default: "FirstLight AI | Practical AI Systems for Messy Workflows",
    template: "%s | FirstLight AI",
  },
  description:
    "FirstLight AI helps UK businesses simplify messy workflows, reduce repeated admin, improve data flow and build useful AI automation systems. Based in Liverpool.",
  keywords: [
    "FirstLight AI",
    "AI automation consultancy UK",
    "AI consultancy Liverpool",
    "workflow automation",
    "business process automation",
    "practical AI systems",
    "admin automation",
    "CRM automation",
    "AI workflow audit",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FirstLight AI | Clean Process First. Useful AI Second.",
    description:
      "Practical AI systems for small teams with messy workflows. Simplify admin, improve data flow and apply useful AI only where it removes friction.",
    url: "https://firstlightai.co.uk",
    siteName: "FirstLight AI",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstLight AI | Clean Process First. Useful AI Second.",
    description:
      "FirstLight AI helps UK businesses simplify messy workflows and build useful AI automation systems.",
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
    "FirstLight AI helps UK businesses simplify messy workflows, reduce repeated admin, improve data flow and build useful AI automation systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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
