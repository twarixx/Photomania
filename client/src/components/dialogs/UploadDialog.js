import FileUpload from "../FileUpload";
import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";

export const UploadDialog = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Transition appear show={isOpen}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                                        <input rows="50"
                                               className="h-10 w-full bg-[#eaeaea] border border-[#cccccc] rounded outline-none p-2 text-[#8f8f8f] placeholder-[#8f8f8f]"
                                               type="text" placeholder="Caption" name="Caption"/>
                                        <FileUpload/>
                                        <button
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
    )
}