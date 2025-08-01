import "./globals.css";
import { Barlow_Condensed } from "next/font/google";
import { ThemeProvider } from "./theme-context";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["200", "300"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={barlow.className}>
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
