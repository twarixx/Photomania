import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";

export const Sidebar = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="w-[20%] bg-sky-800 h-screen flex flex-col">
            <div className="py-4 text-center text-white text-2xl font-bold border-b-sky-900 border-b-2">
                <h1 className="hidden sm:block">PHOTOMANIA</h1>
                <h1 className="sm:hidden block">PM</h1>
            </div>

            <div className="pl-2 mt-3 pl-2 text-white text-md">
                <ul className="space-y-2">
                    <Link to="/panel">
                        <li className="hover:bg-sky-700 rounded-lg px-3 py-1">Home</li>
                    </Link>
                    <Link to="/panel/posts/">
                        <li className="hover:bg-sky-700 rounded-lg px-3 py-1">Posts</li>
                    </Link>
                    <Link to="/panel/users/">
                        <li className="hover:bg-sky-700 rounded-lg px-3 py-1">Users</li>
                    </Link>
                    <Link to="/panel/moderation/">
                        <li className="hover:bg-sky-700 rounded-lg px-3 py-1">Moderation</li>
                    </Link>
                </ul>
            </div>

            <div
                className="w-full text-white mt-auto text-md font-semibold mb-3 flex justify-center text-center space-x-2">
                <Link to={`/${currentUser.username}`}>
                    <img
                        className="w-9 sm:w-11 aspect-square object-cover rounded-full border-2 border-solid border-white relative"
                        title={currentUser.display_name}
                        src={currentUser.profile_picture || '/images/profile_pictures/_default_.jpg'}
                        alt="Profile Pic"/>
                </Link>
            </div>
        </div>
    )
}