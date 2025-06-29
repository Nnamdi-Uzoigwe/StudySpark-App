import Faq from "@/sections/Faq";
import HomeHero from "@/sections/HomeHero";
import HowItWorks from "@/sections/HowItWorks";
import KeyFeatures from "@/sections/KeyFeatures";
import Testimonials from "@/sections/Testimonials";


export default function Home() {
  return (
    <div className="bg-[#202222]">
         <HomeHero />
         <HowItWorks />
         <KeyFeatures />
         <Testimonials />
         <Faq />
    </div>
  );
}
