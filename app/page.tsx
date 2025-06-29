import HomeHero from "@/sections/HomeHero";
import HowItWorks from "@/sections/HowItWorks";
import KeyFeatures from "@/sections/KeyFeatures";


export default function Home() {
  return (
    <div className="bg-[#202222]">
         <HomeHero />
         <HowItWorks />
         <KeyFeatures />
    </div>
  );
}
