import {QueryClientProvider} from "@tanstack/react-query";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../admin/Sidebar";

export const AdminLayout = ({queryClient}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-[#efefef h-screen w-screen]">
                <div className="flex">
                    <Sidebar/>
                    <div className="w-full h-full p-4">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    )
}