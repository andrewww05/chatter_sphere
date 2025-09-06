import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { AbstractIntlMessages, hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getServerSession, Session } from "next-auth";
import { SessionProvider } from "@/providers/SessionProvider";

type Props = {
  children: ReactNode;
  session: Session;
  params: { locale: string };
};

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatter Sphere",
  description: "Your sphere for real talks, fresh ideas, and global connections.",
};

export default async function RootLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;

  const session = await getServerSession();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${interSans.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
