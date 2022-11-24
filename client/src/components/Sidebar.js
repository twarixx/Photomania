import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {makeRequest} from "../axios";

function Sidebar() {
    const {currentUser} = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const loadData = async () => {
        try {
            const data = await makeRequest.get(`/users/random`);
            return data.data;
        } catch {
            return null;
        }
    }

    useEffect(() => {
        loadData().then(r => {
            setUsers(r);
        });
    }, []);


    return (
        <div className="hidden sm:flex flex-col w-2/6 space-y-3 z-20">
            <div className="hidden sm:block w-auto rounded-none sm:rounded-md ml-30 w-2/6 bg-white text-black z-20">
                <Link to={`/${currentUser.username}`}>
                    <div className="flex items-center p-4">
                        <img className="w-14 aspect-square object-cover h-full rounded-lg"
                             src={currentUser.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                        <div className="justify-center ml-3">
                            <div className="flex items-center">
                                <h1 className="text-md font-semibold">{currentUser.display_name}</h1>
                                {currentUser.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg" title={currentUser.display_name + ' is verified'} alt="Verified"/>}
                            </div>
                            <p className="text-gray-400 text-sm">@{currentUser.username}</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div
                className="hidden sm:block w-auto rounded-none sm:rounded-md ml-30 w-2/6 bg-white text-black z-20 pt-4">
                <h1 className="header">Suggested Accounts</h1>
                {users.map(user => {
                    return (
                        <Link key={user.username} to={'/' + user.username} className="flex items-center p-4">
                            <img className="w-14 aspect-square object-cover h-full rounded-lg"
                                 src={user.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                            <div className="justify-center ml-3">
                                <div className="flex items-center">
                                    <p>{user.display_name}</p>
                                    {user.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg" title={user.display_name + ' is verified'} alt="Verified"/>}
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