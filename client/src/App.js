import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/UploadPage";
import UnknownPage from "./pages/UnknownPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <div>
            <BrowserRouter>
                <div className="relative">
                    <Header/>

                    <div className="w-full h-full object-fit w-ful z-0">
                        <img className="h-3/5 w-full z-0" src="/images/header-three.jpg" alt="Header"/>
                    </div>
                </div>

                <div className="sm:mx-[7%] flex mt-0 sm:mt-[-30px] z-0 sm:space-x-6">
                    <Sidebar />

                    <div className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-full text-black z-20">
                        <Routes>3
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/:username" element={<UserPage/>}/>
                            <Route path="/post/:postid" element={<PostPage/>}/>
                            <Route path="/upload" element={<UploadPage/>}/>
                            <Route path="*" element={<UnknownPage/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
