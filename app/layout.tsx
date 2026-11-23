import type { Metadata } from 'next';
export const metadata: Metadata = {title:'PoetisA', description:'Tres palabras de tu día, un poema chileno publicado para acompañarte.', manifest:'/manifest.webmanifest'};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="es"><body>{children}</body></html>;}
