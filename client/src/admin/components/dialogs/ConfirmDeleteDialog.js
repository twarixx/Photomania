import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";
import {Upload} from "../../../axios";
import {useQueryClient} from "@tanstack/react-query";

export const ConfirmDeleteDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();

    const handleClick = async event => {
        event.preventDefault();
        if (!caption || !file) return;

        const image = await Upload(file);
        const post = {
            caption: caption,
            source: image,

        }

        setCaption("");
        setFile(null);
        closeModal();
    }

    return (
        <>
            <button onClick={openModal} className="bg-red-500 py-2 px-4 rounded">Delete</button>

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
                                    className="w-screen max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <h1 className="text-center text-lg font-semibold">Confirm</h1>

                                    <form className="mt-4">
                                        <div className="space-y-3 flex flex-col">
                                            <p>Are you sure that you want to delete this post?</p>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );

}

