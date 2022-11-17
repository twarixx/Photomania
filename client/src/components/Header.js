import '../App.css';
import {Link, useNavigate} from "react-router-dom";
import {Menu, Transition} from "@headlessui/react";

let searchValue = '';

function Header() {
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        const searchBar = document.getElementById('searchbar');
        searchBar.value = '';
        searchBar.blur();

        navigate(`/${searchValue}`);
    };

    return (
        <>
            <nav
                className="bg-black text-white bg-opacity-30 h-20 w-full flex items-center px-5 justify-between shadow-sm fixed">
                <div>
                    <Link to="/"><h1 className="font-semibold text-lg tracking-widest">PHOTOMANIA</h1></Link>
                </div>

                <div className="flex-grow max-w-xl relative">
                    <div className="absolute flex items-center w-5 ml-2 h-full">
                        <img src="/icons/search.svg" alt="Search"/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input id="searchbar" onChange={e => searchValue = e.target.value}
                               className="text-[#8f8f8f] placeholder-[#8f8f8f] rounded-md h-10 px-2 pl-9 w-full bg-[#cccccc] outline-none border-solid border-2 border-[#8f8f8f]"
                               type="text" placeholder="Search"/>
                    </form>
                </div>

                <div className="flex items-center">
                    <Link to="/upload"><img className="w-10 mr-5 h-full" src="/icons/upload.svg" alt="Upload" title="Upload"/></Link>

                    {userDropdown()}
                </div>
            </nav>

            <div className="w-full h-full object-fit  w-full">
                <img className="h-3/5 w-full" src="/images/header-three.jpg" alt="Header"/>
            </div>
        </>
    )
}

function userDropdown() {
    return (
        <Menu>
            <Menu.Button><img
                className="w-12 aspect-square object-cover rounded-full border-2 border-solid border-white"
                title="Esmay" src="/images/profile_pictures/esmay.jpg" alt="Profile Pic"/></Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items
                    className="absolute right-0 mt-12 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            <Link to="/esmay"><p className="px-4 py-2 border-b">Profile</p></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/settings"><p className="px-4 py-2 border-b">Account settings</p></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/logout"><p className="px-4 py-2">Log out</p></Link>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}


export default Header;