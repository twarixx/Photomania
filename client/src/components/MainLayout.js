import {QueryClientProvider} from "@tanstack/react-query";
import Header from "./elements/Header";
import Sidebar from "./elements/Sidebar";
import {Outlet} from "react-router-dom";
import {makeRequest} from "../axios";

export const MainLayout = ({queryClient}) => {

    return (
        <QueryClientProvider client={queryClient}>
            <div className="relative">
                <Header/>
            </div>

            <div className="sm:mx-[7%] flex mt-0 sm:mt-[-30px] z-0 sm:space-x-6">
                <Sidebar/>

                <div className="flex flex-col space-y-3 w-full">
                    <Outlet/>
                </div>
            </div>

            <div className="w-full h-5">

            </div>
        </QueryClientProvider>
    )
}