import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/UploadPage";
import UnknownPage from "./pages/UnknownPage";
import Header from "./components/Header";

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

                <div className="sm:mx-[7%] flex mt-0 sm:mt-[-30px] z-0">
                    <div className="hidden sm:flex flex-col w-2/6 space-y-3 z-20">
                        <div className="hidden sm:block w-auto rounded-none sm:rounded-md px-4 py-5 ml-30 w-2/6 bg-white text-black z-20">
                            <h1 className="text-2xl font-semibold">NAVIGATION</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore dolorem quos repellat sed sequi? Adipisci delectus dignissimos esse est iusto minima, mollitia quis recusandae repellat rerum sed temporibus velit.</p>
                        </div>
                        <div className="hidden sm:block w-auto rounded-none sm:rounded-md px-4 py-5 ml-30 w-2/6 bg-white text-black z-20">
                            <h1 className="text-2xl font-semibold">NOOBIE :D</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem doloremque doloribus, necessitatibus quaerat quidem repellendus? Doloribus, placeat, qui? Consectetur deleniti dolorem doloribus earum illo molestias quis repellendus sunt tempore voluptatum!</p>
                        </div>
                    </div>

                    <div className="rounded-none relative sm:rounded-md mx-[3px] sm:ml-[20px] px-4 py-5 w-full bg-white h-full text-black z-20">
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
