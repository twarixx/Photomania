import {Link} from "react-router-dom";

function Sidebar() {
    return (
        <div className="hidden sm:flex flex-col w-2/6 space-y-3 z-20">
            <div className="hidden sm:block w-auto rounded-none sm:rounded-md ml-30 w-2/6 bg-white text-black z-20">
                <Link to="/esmaybe">
                    <div className="flex items-center p-4">
                        <img className="w-14 aspect-square object-cover h-full rounded-lg"
                             src="/images/profile_pictures/esmay.jpg" alt="Profile Pic"/>
                        <div className="justify-center ml-3">
                            <h1 className="text-md font-semibold text-purple-500">Esmay</h1>
                            <p className="text-gray-400 text-sm">@esmaybe</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div
                className="hidden sm:block w-auto rounded-none sm:rounded-md px-4 py-5 ml-30 w-2/6 bg-white text-black z-20">
                <h1 className="header">NOOBIE :D</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem doloremque doloribus,
                    necessitatibus quaerat quidem repellendus? Doloribus, placeat, qui? Consectetur deleniti dolorem
                    doloribus earum illo molestias quis repellendus sunt tempore voluptatum!</p>
            </div>
        </div>
    )
}

export default Sidebar;