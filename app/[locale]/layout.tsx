import type { Metadata } from "next";
import { Inter, Poppins, Space_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactLenis } from "lenis/react";
import { Footer } from "@/components/Footer";
import { FooterRevealLayout } from "@/components/FooterRevealLayout";
import { ModalSlot } from "@/components/ModalSlot";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { routing } from "@/i18n/routing";
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
  title: "Castler — Architectural Design Company",
  description:
    "Castler is an architectural design studio shaping buildings, interiors, and urban spaces.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${spaceMono.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full flow-root bg-ink text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true }} />
          <FooterRevealLayout footer={<Footer />}>
            <Navbar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
          </FooterRevealLayout>
          <ModalSlot>{modal}</ModalSlot>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
