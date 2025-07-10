import Button from "@/components/Button";

export default function Subscribe() {
    return (
        <div className="mt-10 py-10 px-6 lg:px-50">
            <h2 className="text-gray-400 text-[25px] lg:text-3xl text-center lg:text-left font-semibold">Stay Ahead with Smarter Learning Tips</h2>
            <div className="mt-6 flex flex-col lg:flex-row justify-between items-center">
                <p className="text-white w-[100%] lg:w-[50%] text-center lg:text-left mb-4 lg:mb-0">
                    Join our mailing list to get early access, study tips, and free resources. Be the first to know when new features or learning tools drop!
                </p>

                <form className="flex flex-col lg:flex-row items-center gap-2">
                    <input 
                        type="text"
                        placeholder="Enter your email here..."
                        className="bg-white min-w-[250px] lg:min-w-[300px] p-[5px] text-lg rounded-lg"    
                    />
                    <button className="text-white bg-[#398378] hover:bg-[#376059] focus:bg-[#376059] px-6 py-2 rounded-lg w-full lg:w-fit cursor-pointer">Subscribe</button>
                </form>
            </div>
        </div>
    )
}