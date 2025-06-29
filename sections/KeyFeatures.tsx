import { Brain, ChartLine, Link } from "lucide-react";
import { GiBookshelf } from "react-icons/gi";
import { GoGoal } from "react-icons/go";

export default function KeyFeatures() {
    return (
        <div className="px-6 lg:px-50 py-10 text-white">
            <h3 className="text-3xl text-gray-400 font-semibold mb-2 text-center lg:text-left">Key Features</h3>
            <div className="flex justify-center lg:justify-start">
                <span className="bg-[#398378] rounded-full py-[3px] px-4 text-sm text-center lg:text-left">Why Students Love It</span>
            </div>

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-5">

                <div className="bg-[#398378] min-h-[150px]  border-2 border-white p-4 rounded-lg flex flex-col items-center">
                    <Brain />
                    <h4 className="my-2 text-xl font-semibold text-center">AI-Powered Tutor</h4>
                    <p className="text-center">
                        Gets instant answers and explanations, 24/7.
                    </p>
                </div>

                <div className="bg-[#398378] min-h-[150px]  border-2 border-white p-4 rounded-lg flex flex-col items-center">
                    <GoGoal size={24} />
                    <h4 className="my-2 text-xl font-semibold text-center">Peronalized Course Suggestions</h4>
                    <p className="text-center">
                        Discover the next best thing to learn based on your goals.
                    </p>
                </div>

                <div className="bg-[#398378] min-h-[150px] border-2 border-white p-4 rounded-lg flex flex-col items-center">
                    <GiBookshelf size={24} />
                    <h4 className="my-2 text-xl font-semibold text-center">No Content Overload</h4>
                    <p className="text-center">
                        Focus only on what matters. Get relevant content, not random links.
                    </p>
                </div>

                <div className="bg-[#398378] min-h-[150px]  border-2 border-white p-4 rounded-lg flex flex-col items-center">
                    <Link />
                    <h4 className="my-2 text-xl font-semibold text-center">Free + Curated Resources</h4>
                    <p className="text-center">
                        Handpicked Youtube Videos, E-Books, Udemy   Courses, and more.
                    </p>
                </div>

                <div className="bg-[#398378] min-h-[150px] border-2 border-white p-4 rounded-lg flex flex-col items-center">
                    <ChartLine />
                    <h4 className="my-2 text-xl font-semibold text-center">Progress-Aware Support</h4>
                    <p className="text-center">
                        Your learning history guides your journey.
                    </p>
                </div>

            </div>
        </div>
    )
}