import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";
import {makeRequest, Upload} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const UploadDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts/", newPost);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
                queryClient.invalidateQueries(["user:posts"]);
            },
        }
    );

    const handleClick = async event => {
        event.preventDefault();
        if (!caption || !file) return;

        const image = await Upload(file);
        const post = {
            caption: caption,
            source: image,

        }

        mutation.mutate(post);
        setCaption("");
        setFile(null);
        closeModal();
    }

    return (
        <>
            <img onClick={openModal}
                 className="w-8 sm:w-9 mr-3 sm:mr-5 h-full"
                 src="/icons/upload.svg" alt="Upload" title="Upload"/>

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

                                    <h1 className="text-center text-lg font-semibold">Upload</h1>

                                    <form className="mt-4">
                                        <div className="space-y-3 flex flex-col">
                                            <input onChange={e => setCaption(e.target.value)}
                                                className="h-10 w-full bg-[#eaeaea] border border-[#cccccc] rounded outline-none p-2 text-[#8f8f8f] placeholder-[#8f8f8f]"
                                                type="text" placeholder="Caption" name="Caption"/>

                                            <div className="max-w-xl">
                                                <label
                                                    className="flex justify-center text-[38f8f8f] w-full h-32 px-4 transition bg-[#eaeaea] border border-[#cccccc] rounded-md appearance-none cursor-pointer focus:outline-none">
                                                    <span className="flex items-center space-x-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className="w-6 h-6 text-[#8f8f8f]" fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                               d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                                        </svg>
                                                        <span className="font-medium text-[#8f8f8f]">
                                                            Browse for an image here!
                                                        </span>
                                                    </span>
                                                    {file && (
                                                        <img className="absolute w-4/6 h-2/5 object-cover" alt="" src={URL.createObjectURL(file)} />
                                                    )}
                                                    <input accept="image/png, image/jpeg" onChange={event => setFile(event.target.files[0])} type="file" name="file_upload" className="hidden"></input>
                                                </label>
                                            </div>

                                            <button onClick={handleClick}
                                                className="bg-black rounded 600 text-[#fff] content-center h-10">Upload
                                            </button>
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

