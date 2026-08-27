import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {title:"Chá de Casa Nova | Filipe & Cristine",description:"Celebre o novo lar de Filipe e Cristine e escolha um presente para fazer parte desta história."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
