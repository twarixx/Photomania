import '../App.css';
import {Link, useNavigate} from "react-router-dom";
import {Menu, Transition, Dialog, Popover} from "@headlessui/react";
import {useState} from "react";
import users from "./Users";
import Notification from "./Notification";

let searchValue = '';

function Header() {
    const navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = event => {
        event.preventDefault();

        document.querySelectorAll('.searchbar').forEach(bar => {
            if (bar.value !== '') {
                bar.value = '';
                bar.blur();
                closeModal();

                const user = users.find(user => user.username.toLowerCase() === searchValue.toLowerCase() || user.display_name.toLowerCase() === searchValue.toLowerCase());
                if (!user) {
                    bar.setAttribute('placeholder', 'This user could not be found!');
                    bar.style.borderColor = 'red';
                } else {
                    navigate(`/${user.username}`)
                }
            } else {
                bar.setAttribute('placeholder', 'What do you want to search');
                bar.style.borderColor = 'red';
            }
        });
    };

    const handleChange = event => {
        searchValue = event.target.value;
        event.target.setAttribute('placeholder', 'Search');
        event.target.style.borderColor = null;
    };

    return (
        <>
            <nav
                className="absolute bg-black text-white bg-opacity-30 h-14 sm:h-20 w-full flex items-center px-5 justify-between shadow-sm">
                <div className="flex space-x-2 items-center">
                    <Link to="/"><h1 className="hidden sm:block font-semibold text-lg tracking-widest">PHOTOMANIA</h1>
                    </Link>
                    <Link to="/"><h1 className="block sm:hidden font-semibold text-lg tracking-widest">PM</h1></Link>

                    <img onClick={openModal}
                         className="block sm:hidden mt-1 w-6 sm:w-9 mr-3 sm:mr-5 h-full fill-white text-white"
                         src="/icons/search-white.svg" alt="Search" title="Search"/>
                </div>

                <div className="hidden sm:block flex-grow max-w-xl">
                    {showSearch({handleSubmit, handleChange})}
                </div>


                <div className="flex items-center">
                    <Link to="/"><img className="w-8 sm:w-9 mr-3 sm:mr-5 h-full" src="/icons/home.svg"
                                      alt="Home" title="Home"/></Link>
                    <Link to="/upload"><img className="w-8 sm:w-9 mr-3 sm:mr-5 h-full" src="/icons/upload.svg"
                                            alt="Upload" title="Upload"/></Link>

                    {notifications()}
                    {userDropdown()}
                </div>
            </nav>

            {showModels({isOpen, closeModal, handleSubmit, handleChange})}
        </>
    )
}

function showModels({isOpen, closeModal, handleSubmit, handleChange}) {
    return (
        <Transition appear show={isOpen}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                {showSearch({handleSubmit, handleChange})}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

function showSearch({handleSubmit, handleChange}) {
    return (
        <div className="mt-2 flex-grow relative">
            <div className="absolute flex items-center w-5 ml-2 h-full">
                <img src="/icons/search.svg" alt="Search"/>
            </div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange}
                       className="searchbar text-[#8f8f8f] placeholder-[#8f8f8f] rounded-md h-10 px-2 pl-9 w-full bg-[#cccccc] outline-none border-solid border-2 border-[#8f8f8f]"
                       type="text" placeholder="Search"/>
            </form>
        </div>
    )
}

function notifications() {
    return (
        <div className="mb-[-5px] z-30">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button>
                            <div className="relative">
                                <img className="w-8 sm:w-9 mr-3 sm:mr-5 h-full" src="/icons/notifications.svg"
                                     alt="Notifications" title="Notifications"/>
                                <div className="absolute flex bottom-6 right-4 items-center justify-center bg-red-500 rounded-full text-white w-4 h-4 text-xs">2</div>
                            </div>
                        </Popover.Button>
                        <Transition
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute left-1/2 z-30 mt-3 w-screen max-w-md -translate-x-[85%] transform px-4 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                                        <p className="text-black font-semibold block">Notifications</p>
                                        <Notification title="Shaquille" message="started following you!" />
                                        <Notification title="Admin" message="sent you a message!" />
                                    </div>

                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

function userDropdown() {
    return (
        <Menu>
            <div className="flex flex-col z-30">

                <Menu.Button><img
                    className="w-9 sm:w-11 aspect-square object-cover rounded-full border-2 border-solid border-white relative"
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
                        className="absolute right-0 z-[300] w-56 rounded-md bg-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="z-[100] px-1 py-1 ">
                            <Menu.Item>
                                <Link to="/esmaybe"><p className="px-4 py-2 border-b hover:bg-gray-700">Profile</p>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/settings"><p className="px-4 py-2 border-b hover:bg-gray-700">Account
                                    settings</p></Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/logout"><p className="px-4 py-2 hover:bg-gray-700">Log out</p></Link>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    )
}


export default Header;