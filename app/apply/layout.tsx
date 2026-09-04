import type { Metadata } from "next";
import { Inter, Poppins, Space_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/siteConfig";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Castlerga ariza qoldiring — Vakansiyalar",
  description:
    "Castler jamoasiga qo'shiling: interyer dizayner, arxitektor yoki vizualizator sifatida ariza qoldiring. 48 soat ichida javob beramiz.",
  alternates: { canonical: `${SITE_URL}/apply` },
  robots: { index: true, follow: true },
};

/**
 * Deliberately its own root layout, outside app/[locale]/ — this is a
 * single-purpose ad landing page (Meta Ads traffic), not part of the main
 * site. No Navbar/Footer/language switcher/Lenis smooth-scroll: every one
 * of those is one more way to leave the page before finishing the form.
 * Also no next-intl provider — the page is Uzbek-only by design, matching
 * the ad audience, so there is no locale to resolve.
 */
export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} ${spaceMono.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full bg-ink text-paper antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
