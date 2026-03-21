import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const introsFont = localFont({
  src: "../public/fonts/PlaywriteDKUloopetGuides-Regular.ttf",
  variable: "--font-intros"
});

const eventsFont = localFont({
  src: "../public/fonts/PlaywriteDKLoopet-Regular.ttf",
  variable: "--font-events"
});

const siteFont = localFont({
  src: "../public/fonts/NotoSansPahawhHmong-Regular.ttf",
  variable: "--font-site"
});

export const metadata: Metadata = {
  title: "intros",
  description: "Caltech builders community."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${siteFont.variable} ${introsFont.variable} ${eventsFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
