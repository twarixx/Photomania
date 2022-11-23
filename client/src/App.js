import './App.css';
import {createBrowserRouter, RouterProvider, Outlet, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UnknownPage from "./pages/UnknownPage";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/UploadPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    const currentUser = true;

    const Layout = () => {
        return (
            <>
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
            </>
        );
    };

    const LoggedIn = ({children}) => {
        if (!currentUser) {
            return <Navigate to="/login"/>;
        }

        return children;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <LoggedIn>
                    <Layout/>
                </LoggedIn>
            ),
            children: [
                {
                    path: "/",
                    element: <HomePage/>,
                },
                {
                    path: "/:username",
                    element: <UserPage/>,
                },
                {
                    path: "/post/:postId",
                    element: <PostPage/>,
                },
                {
                    path: "/upload",
                    element: <UploadPage/>,
                },
                {
                    path: "*",
                    element: <UnknownPage/>,
                }
            ],
        },
        {
            path: "/login",
            element: <LoginPage/>,
        },
        {
            path: "/register",
            element: <RegisterPage/>,
        }
    ]);

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
