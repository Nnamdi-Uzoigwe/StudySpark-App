import ChatSection from "./ChatSection";
import GreetingPanel from "./GreetingPanel";
import Recommendations from "./Recommendations";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    return (
        <div className="bg-white h-auto flex flex-col lg:flex-row w-full">
            <Sidebar />

            
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

// import ChatSection from "./ChatSection";
// import GreetingPanel from "./GreetingPanel";
// import Recommendations from "./Recommendations";
// import Sidebar from "./Sidebar";

// export default function Dashboard() {
//     return (
//         <div className="flex min-h-screen bg-white">
//             {/* Sidebar (fixed or sliding) */}
//             <Sidebar />

//             {/* Main content */}
//             <main className="pt-[80px] lg:pt-0 lg:ml-[300px] px-4">
//                 <GreetingPanel />

//                 <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
//                     <div className="col-span-2">
//                         <ChatSection />
//                     </div>

//                     <div className="col-span-1 hidden lg:block">
//                         <Recommendations />
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }
