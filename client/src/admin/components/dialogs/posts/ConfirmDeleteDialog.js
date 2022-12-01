import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";
import {makeRequest, Upload} from "../../../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

export const ConfirmDeleteDialog = ({uniqueId, location}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        () => {
            return makeRequest.delete(`/posts/${uniqueId}/${location.replaceAll("/", ":")}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
                queryClient.invalidateQueries(["user:posts"]);
                queryClient.invalidateQueries(["admin:posts"]);
            },
        }
    );

    const handleClick = async event => {
        event.preventDefault();

        mutation.mutate();
        navigate("/panel/posts");
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
                                    className="w-screen max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <h1 className="text-center text-lg font-semibold">Confirm</h1>

                                    <form className="mt-4">
                                        <div className="space-y-3 flex flex-col">
                                            <p className="my-1">Are you sure that you want to delete this post? It will be lost for forever, a really, really long time!</p>

                                           <div className="flex ml-auto space-x-2 text-white">
                                               <button className="bg-gray-500 px-4 py-2" onClick={(e) => {e.preventDefault();closeModal();}}>Cancel</button>
                                               <button className="bg-red-600 px-4 py-2" onClick={handleClick}>Delete</button>
                                           </div>
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

