import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";
import imageCompression from "browser-image-compression";
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SearchBar} from "../requirements/SearchBar";

export const SearchDialog = ({navigate}) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    return (
        <>
            <img onClick={openModal}
                 className="block sm:hidden mt-1 w-6 sm:w-9 mr-3 sm:mr-5 h-full fill-white text-white"
                 src="/icons/search-white.svg" alt="Search" title="Search"/>

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

                                    <SearchBar closeModal={closeModal} navigate={navigate}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );

}

