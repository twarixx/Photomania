import {Link} from "react-router-dom";
import users from "./Users";

function Sidebar() {
    return (
        <div className="hidden sm:flex flex-col w-2/6 space-y-3 z-20">
            <div className="hidden sm:block w-auto rounded-none sm:rounded-md ml-30 w-2/6 bg-white text-black z-20">
                <Link to="/esmaybe">
                    <div className="flex items-center p-4">
                        <img className="w-14 aspect-square object-cover h-full rounded-lg"
                             src="/images/profile_pictures/esmay.jpg" alt="Profile Pic"/>
                        <div className="justify-center ml-3">
                            <h1 className="text-md font-semibold">Esmay</h1>
                            <p className="text-gray-400 text-sm">@esmaybe</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div
                className="hidden sm:block w-auto rounded-none sm:rounded-md ml-30 w-2/6 bg-white text-black z-20 pt-4">
                <h1 className="header">Suggested Accounts</h1>
                {/* Get 5 random users without the name Esmaybe*/}
                {users.filter(user => user.username !== "Esmaybe").sort(() => Math.random() - 0.5).slice(0, 5).map(user => {
                    return (
                        <Link to={'/' + user.username} className="flex items-center p-4">
                            <img className="w-14 aspect-square object-cover h-full rounded-lg"
                                 src={user.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                            <div className="justify-center ml-3">
                                <div className="flex items-center">
                                    <p>{user.display_name}</p>
                                    {user.verified && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg" title={user.display_name + ' is verified'} alt="Verified"/>}
                                </div>
                                <p className="text-gray-400 text-sm">@{user.username}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar;