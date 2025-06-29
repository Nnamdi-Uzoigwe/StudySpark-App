import Button from "./Button";

export default function Navbar() {
    return (
        <div className="bg-[#202222] h-[100px] px-6 lg:px-50 pt-10 lg:pt-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
            <div className="flex items-center">
                <img src="/logo.png" alt="logo" />
                <span className="text-white text-xl">StudySpark</span>
            </div>

            <div className="flex gap-6 text-white">
                <p>Home</p>
                <p>Features</p>
                <p>FAQs</p>
                <p>Login</p>
            </div>

            <div className="flex justify-center lg:justify-start mt-3 lg:mt-0">
                <Button>Get Started</Button>
            </div>
        </div>
    )
}