import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";
import {makeRequest, Upload} from "../../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const EditPostDialog = ({post, refetch}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);

    const [caption, setCaption] = useState(post.caption);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newPost) => {
            return makeRequest.put(`/posts/update`, newPost);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
                queryClient.invalidateQueries(["user:posts"]);
                queryClient.invalidateQueries(["admin:posts"]);
                window.location.reload();
            },
        }
    );

    const handleClick = async event => {
        event.preventDefault();

        const source = image ? await Upload(image) : post.source;
        const newPost = post;
        newPost.caption = caption;

        mutation.mutate({...newPost, source: source});

        setImage(null);
        closeModal();
    }

    return (
        <>
            <button onClick={openModal} className="bg-orange-500 py-2 px-4 rounded">Edit</button>

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
                                    className="w-screen max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <h1 className="text-center text-lg font-semibold">Edit Post</h1>

                                    <form className="mt-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label htmlFor="image">
                                                    <span>Image</span>
                                                    <img className="w-52 aspect-square object-cover rounded-md"
                                                         src={
                                                             image
                                                                 ? URL.createObjectURL(image)
                                                                 : post.source
                                                         }
                                                         alt=""
                                                    />
                                                </label>
                                                <input
                                                    type="file"
                                                    id="image"
                                                    accept="image/png, image/jpeg"
                                                    style={{display: "none"}}
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                />
                                            </div>

                                            <div className="mt-0.5 flex flex-col justify-between">
                                                <div className="flex flex-col">
                                                    <label htmlFor="caption">
                                                        <span>Caption</span>
                                                    </label>

                                                    <input
                                                        className="p-2 bg-[#efefef] rounded-md"
                                                        placeholder="Caption"
                                                        type="text"
                                                        id="caption"
                                                        name="caption"
                                                        value={caption}
                                                        onChange={e => setCaption(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={handleClick}
                                                className="bg-black w-full my-5 rounded 600 text-[#fff] content-center h-10">Update
                                        </button>
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

