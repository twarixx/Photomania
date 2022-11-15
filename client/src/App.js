import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/UploadPage";
import UnknownPage from "./pages/UnknownPage";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar/>
                <h1 className="font-bold text-red-500 text-4xl">Welcome to my website!</h1>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/:username" element={<UserPage/>}/>
                    <Route path="/post/:postid" element={<PostPage/>}/>
                    <Route path="/upload" element={<UploadPage/>}/>
                    <Route path="*" element={<UnknownPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
