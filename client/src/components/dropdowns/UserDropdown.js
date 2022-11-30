import {Menu, Transition} from "@headlessui/react";
import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

export const UserDropdown = ({navigate}) => {
    const {currentUser, logout} = useContext(AuthContext);

    const onLogout = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8500/api/auth/logout');
            logout();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Menu>
            <div className="flex flex-col z-30">

                <Menu.Button><img
                    className="w-9 sm:w-11 aspect-square object-cover rounded-full border-2 border-solid border-white relative"
                    title={currentUser.display_name}
                    src={currentUser.profile_picture || '/images/profile_pictures/_default_.jpg'}
                    alt="Profile Pic"/></Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items
                        className="absolute right-0 z-[300] w-56 rounded-md bg-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="z-[100] px-1 py-1 ">
                            <Menu.Item>
                                <Link to={`/${currentUser.username}`}><p
                                    className="px-4 py-2 border-b hover:bg-gray-700">Profile</p>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/settings"><p className="px-4 py-2 border-b hover:bg-gray-700">Account
                                    settings</p></Link>
                            </Menu.Item>
                            <Menu.Item>
                                <p onClick={onLogout}
                                   className="px-4 py-2 hover:bg-gray-700 hover:cursor-pointer">Log out</p>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    );

}

