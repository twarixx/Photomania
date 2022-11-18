import {useParams} from "react-router-dom";
import UnknownPage from "./UnknownPage";
import users from "../components/Users";

function UserPage() {
    const {username} = useParams();

    const foundUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (!foundUser) return <UnknownPage/>;

    return (
        <>
            <div
                className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                <div className="flex">
                    <img className="w-36 aspect-square object-cover h-full rounded-md"
                         src={foundUser.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                    <div className="flex flex-col ml-3">
                        <div className="flex">
                            <p className="text-lg">{foundUser.display_name}</p>
                            {foundUser.verified && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg" title={foundUser.display_name + ' is verified'} alt="Verified"/>}
                        </div>
                        <p className="text-gray-400 text-sm">@{foundUser.username}</p>

                        <div className="flex flex-col mt-auto">
                            <p><span className="profilecount">{foundUser.followers}</span> {foundUser.followers === 1 ? 'follower' : 'followers'}</p>
                            <p><span className="profilecount">{foundUser.following}</span> following</p>
                            <p><span className="profilecount">{foundUser.posts.length}</span> {foundUser.posts.length === 1 ? 'post' : 'posts'}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserPage;