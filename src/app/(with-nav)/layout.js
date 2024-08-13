import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import { JobProvider } from '@/components/Jobcontext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    //       <Navbar />
    //           {children}
    //       <Footer />
    //   </body>
    // </html>
    <div className={"${inter.className} flex flex-col min-h-screen bg-white dark:bg-black"}>
      {/* <JobProvider> */}
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      {/* </JobProvider> */}
    </div>

  );
}
   