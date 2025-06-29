import FaqAccordion from "@/components/FaqAccordion";

export default function Faq() {
    return (
        <div className="mt-10 px-6 lg:px-50">
            <div className="flex flex-col justify-center items-center">

            <h2 className="text-3xl text-gray-400 font-semibold text-center mb-2">Frequently Asked Questions</h2>
            <p className="mb-6 w-[100%] lg:w-[50%] text-center text-gray-300">Got questions? We've got answers. Below are some of the most common things learners ask about our AI-powered study assistant and how it works.</p>
            </div>
            <FaqAccordion />
        </div>
    )
}