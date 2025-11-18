import '@/app/globals.css'
import localFont from "next/font/local";
import Header from '@/components/header';
import { headers } from 'next/headers'; // Changed from cookies to headers
import { redirect } from 'next/navigation';


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
  const headersList = headers();
  const cookieHeader = headersList.get('cookie');

  let session = null;
  let nextUrlPath = '/';

  if (cookieHeader) {
    const cookiesArray = cookieHeader.split(';');
    for (const cookie of cookiesArray) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'session') {
        try {
          session = JSON.parse(decodeURIComponent(value));
        } catch (e) {
          console.error("Error parsing session cookie:", e);
        }
      } else if (name === 'next-url') {
        nextUrlPath = decodeURIComponent(value);
      }
    }
  }

  if ((nextUrlPath.startsWith('/dashboard') || nextUrlPath.startsWith('/acerca')) && !session) {
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
