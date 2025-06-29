import { BookOpenText, MessageCircleQuestionMark, Search } from "lucide-react";

export default function HowItWorks() {
    return (
        <div className="px-6 lg:px-50 py-10 text-white">
            <h1 className="text-gray-400 text-3xl font-semibold text-center lg:text-left">How It Works in 3 Simple Steps</h1>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">

                <div className="bg-[#393e3e] rounded-lg p-4">
                    <div className="flex justify-center lg:justify-start items-center gap-3 mb-2">
                        <div className="bg-[#398378] text-white flex justify-center items-center  h-10 w-10 rounded-md mb-2">
                            <Search size={28}/>
                        </div>
                        <h3 className="text-xl font-semibold">Ask Anything</h3>
                    </div>
                    <p className="text-center lg:text-left">
                        Chat with your AI-powered study buddy. Ask questions, get tips,
                        or clear up confusion.
                    </p>
                </div>

                <div className="bg-[#393e3e] rounded-lg p-4">
                    <div className="flex justify-center lg:justify-start items-center gap-3 mb-2">
                        <div className="bg-[#398378] text-white flex justify-center items-center  h-10 w-10 rounded-md mb-2">
                            <MessageCircleQuestionMark />
                        </div>
                        <h3 className="text-xl font-semibold">Get Instant Help</h3>
                    </div>
                    <p className="text-center lg:text-left">
                        Receive quick explanations, guidance, or suggested learning paths
                        based on your interests.
                    </p>
                </div>

                <div className="bg-[#393e3e] rounded-lg p-4">
                    <div className="flex justify-center lg:justify-start items-center gap-3 mb-2">
                        <div className="bg-[#398378] text-white flex justify-center items-center  h-10 w-10 rounded-md mb-2">
                            <BookOpenText />
                        </div>
                        <h3 className="text-xl font-semibold">Explore Recommended Courses</h3>
                    </div>
                    <p className="text-center lg:text-left">
                        Discover free, high-quality courses from trusted platforms - tailored 
                        to your learning goals.
                    </p>
                </div>

            </div>
        </div>
    )
}