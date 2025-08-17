import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sessionwraper from "@/components/Sessionwrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Connected Web",
  description: "Generated to solve your tangible problems ",
  // icons: {
  //   icon: "public/ChatGPT Image Aug 17, 2025, 09_14_43 PM.png", // or "/connectedweb-logo.png"
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Sessionwraper>
        <div>
          {/* <Navbar/> */}
        {children}
        </div>
        </Sessionwraper>
      </body>
    </html>
  );
}
