import Image from "next/image";

export default function Footer() {
    return (
        <div className="bg-[#0c1010] py-10 px-6 lg:px-50">
             <div className="flex justify-center lg:justify-start items-center">
                <Image src="/logo.png" alt="logo"  width={70} height={70} />
                <span className="text-white text-xl">StudySpark</span>
            </div>

            <div className="mt-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center">
                    <div className="flex flex-col items-center lg:flex-row text-white gap-4 mb-4 lg:mb-0">
                        <p>Home</p>
                        <p>Features</p>
                        <p>FAQs</p>
                        <p>Login</p>
                        <p>Terms of Use</p>
                    </div>

                    <p className="text-white">© 2025 <span className="text-[#398378]">StudySpark</span>. All rights reserved.</p>
            </div>
        </div>
    )
}