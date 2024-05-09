import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Freeday Quiz",
  description: "trivial de preguntas para Hack a Boss",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
