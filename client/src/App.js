import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/UploadPage";
import UnknownPage from "./pages/UnknownPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LogoutPage from "./pages/LogoutPage";
import PostCommentsPage from "./pages/PostCommentsPage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <div className="relative">
                    <Header/>
                </div>

                <div className="sm:mx-[7%] flex mt-0 sm:mt-[-30px] z-0 sm:space-x-6">
                    <Sidebar/>

                    <div className="flex flex-col space-y-3 w-full">
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/:username" element={<UserPage/>}/>
                            <Route path="/post/:postid" element={<PostPage/>}/>
                            <Route path="/post/:postid/comments" element={<PostCommentsPage/>}/>
                            <Route path="/upload" element={<UploadPage/>}/>
                            <Route path="/logout" element={<LogoutPage/>}/>
                            <Route path="*" element={<UnknownPage/>}/>
                        </Routes>
                    </div>
                </div>

                <div className="w-full h-5">

                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
