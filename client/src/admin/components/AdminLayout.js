import {QueryClientProvider} from "@tanstack/react-query";
import {Outlet} from "react-router-dom";
import {Sidebar} from "./elements/Sidebar";

export const AdminLayout = ({queryClient}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="w-screen h-screen bg-[#eaeaea] flex">
                <Sidebar/>
                <div className="p-4 w-full">
                    <Outlet/>
                </div>
            </div>
        </QueryClientProvider>
    )
}