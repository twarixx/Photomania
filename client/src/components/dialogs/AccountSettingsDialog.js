import {Dialog, Transition} from "@headlessui/react";
import {useContext, useState} from "react";
import imageCompression from "browser-image-compression";
import {makeRequest, Upload} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AuthContext} from "../../context/AuthContext";

export const AccountSettingsDialog = () => {
    const {currentUser: user, refetch} = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        email: user.email,
        display_name: user.display_name,
        username: user.username,
    });

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (user) => {
            return makeRequest.put(`/users/update`, user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
                refetch();
            },
        }
    );

    const handleChange = (e) => {
        setTexts((prev) => ({...prev, [e.target.name]: [e.target.value]}));
    };

    const handleClick = async event => {
        event.preventDefault();

        const profilePic = profile ? await Upload(profile) : user.profile_picture;
        mutation.mutate({...texts, profile_picture: profilePic});

        setProfile(null);
        closeModal();
    }

    return (
        <>
            <button onClick={openModal} className="bg-[#A855F7] p-1 px-3 sm:p-2 sm:px-6 rounded-md">Manage</button>

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

                                    <h1 className="text-center text-lg font-semibold">Account Settings</h1>

                                    <form className="mt-4">
                                        <div className="space-y-3 flex flex-col">
                                            <div>
                                                <label htmlFor="profile">
                                                    <span>Profile Picture</span>
                                                    <img className="w-52 aspect-square object-cover rounded-md"
                                                         src={
                                                             profile
                                                                 ? URL.createObjectURL(profile)
                                                                 : user.profile_picture
                                                         }
                                                         alt=""
                                                    />
                                                </label>
                                                <input
                                                    type="file"
                                                    id="profile"
                                                    style={{display: "none"}}
                                                    onChange={(e) => setProfile(e.target.files[0])}
                                                />
                                            </div>

                                            <button onClick={handleClick}
                                                    className="bg-black rounded 600 text-[#fff] content-center h-10">Update
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

