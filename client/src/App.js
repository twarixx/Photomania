import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UnknownPage from "./pages/UnknownPage";
import PostPage from "./pages/PostPage";
import RegisterPage from "./pages/RegisterPage";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";
import {QueryClient} from '@tanstack/react-query'
import Home from "./pages/admin/Home";
import {MainLayout} from "./components/layout/MainLayout";
import {AdminLayout} from "./components/layout/AdminLayout";
import {Users} from "./pages/admin/Users";

function App() {
    const {currentUser} = useContext(AuthContext);
    const queryClient = new QueryClient()

    const LoggedIn = ({children}) => {
        if (!currentUser) {
            return <Navigate to="/login"/>;
        }

        return children;
    }

    const IsModerator = ({children}) => {
        if (currentUser.role === 0) {
            return <Navigate to="/unknown"/>;
        }

        return children;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <LoggedIn>
                    <MainLayout queryClient={queryClient}/>
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
                    path: "*",
                    element: <UnknownPage/>,
                }
            ],
        },
        {
            path: "/panel",
            element: (
                <LoggedIn>
                    <IsModerator>
                    <AdminLayout queryClient={queryClient}/>
                    </IsModerator>
                </LoggedIn>
            ),
            children: [
                {
                    path: "/panel/",
                    element: <Home/>,
                },
                {
                    path: "/panel/users",
                    element: <Users/>,
                },
                {
                    path: "/panel/users/:username",
                    element: <Users/>,
                },
                {
                    path: "/panel/*",
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
