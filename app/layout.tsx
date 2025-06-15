import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MathPractice - Nền tảng luyện tập toán học",
  description: "Nền tảng luyện tập toán học tương tác với feedback tức thì và giải thích chi tiết",
  generator: 'v0.dev',
  icons: {
    icon: '/bechovang.webp',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
            window.MathJax = {
              tex: {
                inlineMath: [['\\\\(', '\\\\)']],
                displayMath: [['\\\\[', '\\\\]']],
                processEscapes: true,
                processEnvironments: true
              },
              startup: {
                ready: () => {
                  console.log('MathJax v3 startup: Ready!');
                  MathJax.startup.defaultReady();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('MathJaxReady'));
                  }
                }
              },
              svg: { fontCache: 'global' }
            };

            window.typesetMath = (element) => {
              if (window.MathJax && window.MathJax.typesetPromise && element) {
                console.log('Manually typesetting:', element);
                window.MathJax.typesetPromise([element]).catch(err => console.error('Manual typeset error:', err));
              } else {
                console.warn('MathJax or element not ready for manual typeset.');
              }
            };
          `}
        </Script>
        <Script 
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="beforeInteractive"
          id="MathJax-script"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
