import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";
import {makeRequest, Upload} from "../../../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

export const EditUserDialog = ({user}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        email: user.email,
        display_name: user.display_name,
        username: user.username,
        verified: user.verified,
        suspended: user.suspended,
    });

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newUser) => {
            return makeRequest.put(`/users/admin/update`, newUser);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
                queryClient.invalidateQueries(["admin:users"]);
            },
        }
    );

    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.type === "checkbox") {
            value = e.target.checked ? 1 : 0;
        }

        setTexts((prev) => ({...prev, [e.target.name]: value}));
    };

    const handleClick = async event => {
        event.preventDefault();

        const profilePic = profile ? await Upload(profile) : user.profile_picture;
        mutation.mutate({...texts, profile_picture: profilePic ?? '/images/profile_pictures/_default_.jpg', id: user.id});

        window.location.reload();
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
                                                             profile
                                                                 ? URL.createObjectURL(profile)
                                                                 : user.profile_picture ?? '/images/profile_pictures/_default_.jpg'
                                                         }
                                                         alt=""
                                                    />
                                                </label>
                                                <input
                                                    type="file"
                                                    id="image"
                                                    accept="image/png, image/jpeg"
                                                    style={{display: "none"}}
                                                    onChange={(e) => setProfile(e.target.files[0])}
                                                />
                                            </div>

                                            <div className="mt-0.5 flex flex-col justify-between">
                                                <div className="flex flex-col">
                                                    <label htmlFor="email">
                                                        <span>Email</span>
                                                    </label>

                                                    <input
                                                        className="p-2 bg-[#efefef] rounded-md"
                                                        placeholder="Email"
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={texts.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="username">
                                                        <span>Username</span>
                                                    </label>

                                                    <input
                                                        className="p-2 bg-[#efefef] rounded-md"
                                                        placeholder="Username"
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        value={texts.username}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="display">
                                                        <span>Display Name</span>
                                                    </label>

                                                    <input
                                                        className="p-2 bg-[#efefef] rounded-md"
                                                        placeholder="Display Name"
                                                        type="text"
                                                        id="display"
                                                        name="display_name"
                                                        value={texts.display_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="flex flex-row space-x-2">
                                                    <input
                                                        className="p-2 bg-[#efefef] rounded-md"
                                                        placeholder="Verified"
                                                        type="checkbox"
                                                        id="verified"
                                                        name="verified"
                                                        checked={texts.verified === 1}
                                                        onChange={handleChange}
                                                    />

                                                    <label htmlFor="verified">
                                                        <span>Verified</span>
                                                    </label>
                                                </div>
                                                <div className="flex flex-row space-x-2">
                                                    <input
                                                        className="p-2 bg-[#efefef] rounded-md"
                                                        placeholder="Suspended"
                                                        type="checkbox"
                                                        id="suspended"
                                                        name="suspended"
                                                        checked={texts.suspended === 1}
                                                        onChange={handleChange}
                                                    />

                                                    <label htmlFor="suspended">
                                                        <span>Suspended</span>
                                                    </label>
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

