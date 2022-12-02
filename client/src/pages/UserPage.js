import {useLocation} from "react-router-dom";
import {LoadData, makeRequest} from "../axios";
import {useContext} from "react";
import UnknownPage from "./UnknownPage";
import Post from "../components/requirements/Post";
import {AuthContext} from "../context/AuthContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AccountSettingsDialog} from "../components/dialogs/AccountSettingsDialog";

function UserPage() {
    const {currentUser} = useContext(AuthContext);

    const username = useLocation().pathname.split("/")[1];

    const {isLoading, data: user} = LoadData(["user", username], `/users/${username}`);
    const {isLoading: isLoadingPosts, data: posts} = LoadData(["user:posts", "by", username], `/users/${username}/posts`);
    const {isLoading: isLoadingFollowers, data: followers} = LoadData(["user:followers", username], `/users/${username}/followers`);
    const {isLoading: isLoadingFollowed, data: followed} = LoadData(["user:followed", username], `/users/${username}/followed`);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (followed) => {
            if (followed) {
                return makeRequest.delete(`/users/${user.id}/followers`);
            } else {
                return makeRequest.post(`/users/${user.id}/followers`);
            }
        }, {
            onSuccess: () => queryClient.invalidateQueries(["user:followers", username]),
        }
    );

    const handleButton = event => {
        event.preventDefault();

        const isFollowing = followers.includes(currentUser.id);
        mutation.mutate(isFollowing);
    }

    function displayPosts() {
        if (posts.length === 0) {
            return (
                <div
                    className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 h-auto bg-white text-black z-20">
                    <div className="flex justify-center items-center">
                        <p>This user has no posts!</p>
                    </div>
                </div>
            )
        }

        return (
            <div
                className={(posts.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1") + " grid gap-3 h-full"}>
                {posts.sort((a, b) => b.timestamp - a.timestamp).map(post => {
                    return (
                        <div key={`P-` + post.id}
                             className="flex justify-center items-center rounded-none sm:rounded-md px-4 py-5 m-auto w-full h-full bg-white text-black z-20">
                            <Post key={post.id} post={post} clear={true}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (isLoading || isLoadingPosts || isLoadingFollowed || isLoadingFollowers) return "Loading...";
    if (!user) return <UnknownPage/>;

    if (user.suspended) {
        return (
            <>
                <div
                    className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                    <div className="flex">
                        <img
                            className="sm:w-36 aspect-square object-cover h-full rounded-md"
                            src={user.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                        <div className="flex flex-col ml-3">
                            <div className="flex">
                                <p className="text-lg">{user.display_name}</p>
                                {user.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                             title={user.display_name + ' is verified'}
                                                             alt="Verified"/>}
                            </div>

                            <p className="text-gray-400 text-sm">@{user.username}</p>

                            <p className="mt-auto text-gray-600">This user is suspended.</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div
                className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                <div className="flex">
                    <img
                        className="sm:w-36 aspect-square object-cover h-full rounded-md"
                        src={user.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                    <div className="flex flex-col ml-3">
                        <div className="flex">
                            <p className="text-lg">{user.display_name}</p>
                            {user.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                         title={user.display_name + ' is verified'}
                                                         alt="Verified"/>}
                        </div>

                        <p className="text-gray-400 text-sm">@{user.username}</p>

                        <div className="flex flex-col mt-auto">
                            <p className="sm:inline block"><span className="sm:inline block font-bold">{followers.length} </span>  {followers.length === 1 ? 'follower' : 'followers'}</p>
                            <p className="sm:inline block"><span className="sm:inline block mt-1 font-bold">{followed.length} </span>  following</p>
                            <p className="sm:inline block"><span className="sm:inline block mt-1 font-bold">{posts.length} </span>  {posts.length === 1 ? 'post' : 'posts'}</p>
                        </div>
                    </div>
                    <div className="sm:absolute flex flex-col-reverse sm:flex-row items-end sm:items-start sm:justify-end sm:right-5 items-start w-full text-gray-200 font-semibold">
                        <div>
                            {currentUser.username === user.username
                                ? <AccountSettingsDialog/>
                                : followers.includes(currentUser.id)
                                    ? <button onClick={handleButton} className="bg-gray-500 p-1 px-2 sm:p-2 sm:px-4 rounded-md">Unfollow</button>
                                    : <button onClick={handleButton} className="bg-[#A855F7] p-1 px-2 sm:p-2 sm:px-4 rounded-md">Follow</button>}
                        </div>
                    </div>
                </div>
            </div>

            {displayPosts()}
        </>
    )
}

export default UserPage;