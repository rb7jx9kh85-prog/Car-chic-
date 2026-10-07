import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car Chic | Detailing automobile à Corseaux & Vevey",
  description: "Detailing intérieur et extérieur, polissage, traitement céramique, location et achat-vente automobile à Corseaux, près de Vevey.",
  keywords: ["detailing Corseaux", "lavage automobile Vevey", "polissage voiture", "traitement céramique", "Car Chic"],
  icons: { icon: "/favicon.svg" },
  other: { "theme-color": "#090909" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
