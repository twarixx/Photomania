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
import {MainLayout} from "./components/MainLayout";
import {DashboardPage} from "./admin/pages/DashboardPage";
import {AdminLayout} from "./admin/components/AdminLayout";
import {PostsPage} from "./admin/pages/PostsPage";
import {UsersPage} from "./admin/pages/UsersPage";
import {ManagePostPage} from "./admin/pages/ManagePostPage";
import {ManageUserPage} from "./admin/pages/ManageUserPage";

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
        if (!currentUser || currentUser?.role === 0) {
            return <Navigate to="/"/>;
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
                <IsModerator>
                    <AdminLayout queryClient={queryClient}/>
                </IsModerator>
            ),
            children: [
                {
                    path: "/panel",
                    element: <DashboardPage/>,
                },
                {
                    path: "/panel/posts",
                    element: <PostsPage/>,
                },
                {
                    path: "/panel/post/:id",
                    element: <ManagePostPage/>,
                },
                {
                    path: "/panel/users",
                    element: <UsersPage/>,
                },
                {
                    path: "/panel/user/:username",
                    element: <ManageUserPage/>,
                },
                {
                    path: "/panel/*",
                    element: <UnknownPage/>,
                },
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
