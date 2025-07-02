import ChatSection from "./ChatSection";
import GreetingPanel from "./GreetingPanel";
import Recommendations from "./Recommendations";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    return (
        <div className="bg-white h-auto flex w-full">
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            
            <main className="ml-0 lg:ml-[300px] px-0 w-[100%] lg:w-[80%] flex flex-col">
                <GreetingPanel />

                <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="col-span-2">
                        <ChatSection />
                    </div>

                    <div className="col-span-1 hidden lg:block">
                        <Recommendations />
                    </div>
                </div>
            </main>
        </div>
    )
}