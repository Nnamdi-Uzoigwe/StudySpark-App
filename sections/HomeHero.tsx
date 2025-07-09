import Link from "next/link";
import Button from "../components/Button";

export default function HomeHero() {
    return (
        <div className="px-6 lg:px-50 py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-10">
            <div className="text-white">
                <h1 className="text-[30px] lg:text-4xl font-semibold mb-4 text-center lg:text-left">Learn Smarter with your Personal AI Tutor</h1>
                <div className="mb-2 flex justify-center lg:justify-start items-start">
                    <img src="/check.png" alt="" className="w-[7%]" />
                    <p className="w-[100%] lg:w-[65%]">Chat with an intelligent assistant that explains concepts, answers questions, and recommends
                        the best courses tailored just for you.
                    </p>
                </div>
                <div className="mb-4 flex justify-center lg:justify-start items-start">
                    <img src="/check.png" alt="" className="w-[7%]" />
                    <p className="w-[100%] lg:w-[65%]">Start Learning better, faster, and more confidently - 100% free. </p>
                </div>

                <div className="flex justify-center lg:justify-start">
                    <Button><Link href="/dashboard">Get Started</Link></Button>
                </div>
            </div>

            <img src="/hero2.png" alt="" />
        </div>
    )
}