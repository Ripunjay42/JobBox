import { Inter } from "next/font/google";
import "./globals.css";
import { JobProvider } from '@/components/Jobcontext';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JOBBOX.ORG.IN",
  description: "JobBox.org.in is a leading job portal in Assam, providing the latest job opportunities across various sectors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/icon1.png" /></head>
      <body className={inter.className}>
        <JobProvider>
          {children}
        </JobProvider>
      </body>
    </html>
  );
}
