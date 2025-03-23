'use client';
import "./globals.css";
import { UserProvider } from '@/app/context/UserContext'
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 画面遷移が起きた時にローディングを一時的に表示
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5秒表示

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <UserProvider>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: '#fff',
            }}
          >
            <Image
              src="/loading.gif"
              alt="Loading"
              width={300}
              height={300}
              priority
            />
          </div>
        ) : (
          children
        )}
        </UserProvider>
      </body>
    </html>
  );
}
