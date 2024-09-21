import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Eclipse Fragrance - Discover Your Signature Scent</title>
        <meta name="description" content="Eclipse Fragrance offers a curated selection of high-quality perfumes to help you find your perfect scent. Explore our unique collection and elevate your fragrance game today!" />
        <meta name="keywords" content="perfume, fragrance, luxury, scents, Eclipse Fragrance, online perfume store" />
        <meta name="author" content="Eclipse Fragrance" />
      </head>
      <body className={jost.className}>{children}</body>
    </html>
  );
}
