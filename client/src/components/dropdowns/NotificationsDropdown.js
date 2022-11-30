import {Popover, Transition} from "@headlessui/react";
import Notification from "../requirements/Notification";

export const NotificationsDropdown = () => {

    return (
        <div className="mb-[-5px] z-30">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button>
                            <div className="relative">
                                <img className="w-8 sm:w-9 mr-3 sm:mr-5 h-full outline-none" src="/icons/notifications.svg"
                                     alt="Notifications" title="Notifications"/>
                                <div
                                    className="absolute outline-none flex bottom-6 right-4 items-center justify-center bg-purple-500 rounded-full text-white w-4 h-4 text-xs">2
                                </div>
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
                                        <Notification title="Shaquille" message="started following you!"
                                                      userLink="/shaquille"/>
                                        <Notification title="Admin" message="sent you a message!" userLink="/admin"/>
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

