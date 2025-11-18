import '@/app/globals.css'
import localFont from "next/font/local";
import Header from '@/components/header';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCookie } from '@/lib/cookies';


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  title: "Uso de cookies en un sesión"
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const session = await getCookie('session');
  const path = cookieStore.get('next-url')?.value || '/';

  if ((path.startsWith('/dashboard') || path.startsWith('/acerca')) && !session) {
    redirect('/');
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
