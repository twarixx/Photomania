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
        <BrowserRouter>
            <div className="App">
                <h1>Welcome to my website!</h1>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/:username" element={<UserPage/>}/>
                    <Route path="/post/:postid" element={<PostPage/>}/>
                    <Route path="/upload" element={<UploadPage/>}/>
                    <Route path="*" element={<UnknownPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
