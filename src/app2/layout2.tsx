// import { Container } from '@/components/Container'
// import { WEBSITE_HOST_URL } from '@/lib/constants'
// import type { Metadata } from 'next'
// import Link from 'next/link'
// import './global.css'
// import { Header } from '@/layouts/header/header'
// import { TailwindBreakpointsIndicator } from '@/components/tailwind-indicator'
// import { ThemeProvider } from './providers'

// const meta = {
//   title: 'Hunter Chang - Website',
//   description:
//     'Sleep deprived father. FE Engineer in China. Lover of Ramen and Kpop',
//   image: `${WEBSITE_HOST_URL}/og-preview.jpg`,
// }

// export const metadata: Metadata = {
//   title: {
//     default: meta.title,
//     template: '%s | Hunter Chang',
//   },
//   description: meta.description,
//   openGraph: {
//     title: meta.title,
//     description: meta.description,
//     url: WEBSITE_HOST_URL,
//     siteName: meta.title,
//     locale: 'en-US',
//     type: 'website',
//     images: [
//       {
//         url: meta.image,
//       },
//     ],
//   },
//   twitter: {
//     title: meta.title,
//     description: meta.description,
//     images: meta.image,
//     card: 'summary_large_image',
//   },
//   alternates: {
//     canonical: WEBSITE_HOST_URL,
//   },
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//           enableColorScheme
//         >
//           <Header />
//           <main className="bg-gray-200 pt-5 dark:bg-background">
//             <Container>{children}</Container>
//           </main>

//           <TailwindBreakpointsIndicator />

//           <footer className="py-16">
//             <Container>
//               <p>
//                 Built by{' '}
//                 <Link className="link" href="https://twitter.com/hunterhchang">
//                   Hunter Chang
//                 </Link>
//               </p>
//             </Container>
//           </footer>
//         </ThemeProvider>
//       </body>
//     </html>
//     //   <html lang="en" suppressHydrationWarning>
//     //   <head />
//     //   <body
//     //     className={"min-h-screen bg-background font-sans antialiased"}
//     //   >
//     //     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//     //       <div className="relative flex min-h-screen flex-col mx-auto sm" >
//     //         <Header />
//     //         <div className="flex-1 container mx-auto content-center">{children}</div>
//     //       </div>
//     //       <TailwindBreakpointsIndicator />
//     //     </ThemeProvider>
//     //   </body>
//     // </html>
//   )
// }
