import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {LoadData} from "../../../axios";

export const Sidebar = () => {
    const {currentUser, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="w-[20%] h-full bg-zinc-800 text-zinc-400 flex flex-col">
            <Link to={`/${currentUser.username}`}>
                <div className="flex flex-col items-center my-12">
                    <img
                        className="rounded-full aspect-square object-cover w-2/6 mb-6 border-2 border-zinc-600 hover:border-zinc-400"
                        src={currentUser.profile_picture} alt={currentUser.username}/>
                    <p className="text-white">{currentUser.display_name} ({currentUser.username})</p>
                    <p className="text-sm">{currentUser.email}</p>
                </div>
            </Link>
            <div className="items-center w-full">
                <ul className="bg-zinc-700">
                    <NavLink to="/panel"><li className="hover:bg-zinc-600 p-4">Home</li></NavLink>
                    <NavLink to="/panel/posts"><li className="hover:bg-zinc-600 p-4">Posts</li></NavLink>
                    <NavLink to="/panel/users"><li className="hover:bg-zinc-600 p-4">Users</li></NavLink>
                </ul>
            </div>
            <div className="mt-auto text-lg text-zinc-700 font-semibold justify-center flex my-6 items-end w-full">
                <Link to="/"><h1>PHOTOMANIA</h1></Link>
            </div>
        </div>
    )
}