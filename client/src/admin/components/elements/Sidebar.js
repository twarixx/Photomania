import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {Link} from "react-router-dom";

export const Sidebar = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="w-[250px] h-screen bg-zinc-800 text-zinc-400 flex flex-col">
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
                    <Link to="/panel"><li className="hover:bg-zinc-600 p-4">Home</li></Link>
                    <Link to="/panel/posts"><li className="hover:bg-zinc-600 p-4">Posts</li></Link>
                    <Link to="/panel/users"><li className="hover:bg-zinc-600 p-4">Users</li></Link>
                </ul>
            </div>
            <div className="mt-auto text-lg text-zinc-700 font-semibold justify-center flex my-6 items-end w-full">
                <Link to="/"><h1>PHOTOMANIA</h1></Link>
            </div>
        </div>
    )
}