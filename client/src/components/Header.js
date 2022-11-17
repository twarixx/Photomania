import '../App.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Menu, Transition, Dialog} from "@headlessui/react";
import {useState} from "react";

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

                navigate(`/${searchValue}`)
            }
        });
    };

    return (
        <>
            <nav
                className="absolute bg-black text-white bg-opacity-30 h-14 sm:h-20 w-full flex items-center px-5 justify-between shadow-sm">
                <div>
                    <Link to="/"><h1 className="hidden sm:block font-semibold text-lg tracking-widest">PHOTOMANIA</h1>
                    </Link>
                    <Link to="/"><h1 className="block sm:hidden font-semibold text-lg tracking-widest">PM</h1></Link>
                </div>

                <div className="hidden sm:block flex-grow max-w-xl">
                    {showSearch({handleSubmit})}
                </div>


                <div className="flex items-center">
                    <img onClick={openModal}
                         className="block sm:hidden w-8 sm:w-9 mr-3 sm:mr-5 h-full fill-white text-white"
                         src="/icons/search-white.svg" alt="Search" title="Search"/>
                    <img className="w-8 sm:w-9 mr-3 sm:mr-5 h-full fill-white text-white"
                         src="/icons/notifications.svg" alt="Search" title="Search"/>
                    <Link to="/upload"><img className="w-8 sm:w-9 mr-3 sm:mr-5 h-full" src="/icons/upload.svg"
                                            alt="Upload" title="Upload"/></Link>

                    {userDropdown()}
                </div>
            </nav>

            {showModels({isOpen, closeModal, handleSubmit})}
        </>
    )
}

function showModels({isOpen, closeModal, handleSubmit}) {
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

                                {showSearch({handleSubmit})}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

function showSearch({handleSubmit}) {
    return (
        <div className="mt-2 flex-grow relative">
            <div className="absolute flex items-center w-5 ml-2 h-full">
                <img src="/icons/search.svg" alt="Search"/>
            </div>
            <form onSubmit={handleSubmit}>
                <input onChange={e => searchValue = e.target.value}
                       className="searchbar text-[#8f8f8f] placeholder-[#8f8f8f] rounded-md h-10 px-2 pl-9 w-full bg-[#cccccc] outline-none border-solid border-2 border-[#8f8f8f]"
                       type="text" placeholder="Search"/>
            </form>
        </div>
    )
}

function userDropdown() {
    return (
        <Menu>
            <Menu.Button><img
                className="w-9 sm:w-11 aspect-square object-cover rounded-full border-2 border-solid border-white"
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
                            <Link to="/esmay"><p className="px-4 py-2 border-b hover:bg-gray-700">Profile</p></Link>
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
        </Menu>
    )
}


export default Header;