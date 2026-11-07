import type { Metadata } from 'next';
import '@fontsource/bungee/latin-400.css';
import '@fontsource/bungee/vietnamese-400.css';
import '@fontsource/be-vietnam-pro/latin-400.css';
import '@fontsource/be-vietnam-pro/vietnamese-400.css';
import '@fontsource/be-vietnam-pro/latin-600.css';
import '@fontsource/be-vietnam-pro/vietnamese-600.css';
import './globals.css';
export const metadata:Metadata = {title:'CHẠM — Cà phê, kem & chút ăn vặt',description:'Một chút cà phê. Một chút thảnh thơi. Khám phá menu cà phê, kem và ăn vặt tại CHẠM.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="vi"><body>{children}</body></html>}
