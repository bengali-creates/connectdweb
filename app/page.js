import Image from "next/image";
import TextType from "@/animation/typetext";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
  <>
    <Navbar/>
    <main className="relative top-0">
      <section className="bg-purple-700 min-h-screen pt-35">

        <div className="text-white text-center pt-20 md:pl-10 flex">
          <div className="flex flex-col items-center md:items-start ">
            <h1 className="text-6xl font-extrabold tracking-tight">

<TextType 
  text={"Your Connected Web"}
  typingSpeed={75}
  startOnVisible={true}
  loop={true}
  showCursor={true}
  cursorCharacter="|"
/></h1>
            <p className="mt-4 text-4xl font-bold">Let people find ALL YOU</p>
            <p className="mt-2 text-4xl font-bold">In this Multiversial Web</p>
            <p className="mt-2 text-3xl font-bold">Get all Your links Together in One Place</p>
            {/* <Image src="/logo.svg" alt="Logo" width={100} height={100} className="mx-auto mt-6" /> */}
            <p className="tracking-tighter text-amber-200">Join the next generation of creators on ConnectedWeb — your all-in-one link for everything you build, share, and sell.</p>
            <p className=" text-amber-200 "> One smart link that connects your Instagram, YouTube, TikTok, Twitter, personal site, and beyond.</p>

            <p className="tracking-tighter text-amber-200">Whether you're a creator, freelancer, founder, or just getting started — ConnectedWeb is the new way to unify your digital world.</p>
          <div className="mt-15 flex  gap-6 justify-center items-center">
            <input type="text" placeholder="Get your connected web" className="bg-white text-green-800 placeholder:text-green-800 px-6 p-2 rounded-3xl w-xs" />
            <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm bold px-5 py-2.5 text-center me-2 mb-2 m-1.5">Get Now</button>
          </div>
          </div>
          
        </div>
        
      </section>
      <section className="bg-green-800 min-h-screen">page2</section>
    </main>
    </>
  );
}
