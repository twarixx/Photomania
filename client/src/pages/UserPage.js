import {useLocation} from "react-router-dom";
import {makeRequest} from "../axios";
import {useEffect, useState} from "react";
import UnknownPage from "./UnknownPage";
import Post from "../components/Post";
function UserPage() {
    const username = useLocation().pathname.split("/")[1];
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const loadData = async () => {
       try {
           const data = await makeRequest.get(`/users/${username}`);
           return data.data;
       } catch {
           return null;
       }
    }

    const loadPosts = async () => {
        try {
            const data = await makeRequest.get(`/users/${username}/posts`);
            return data.data;
        } catch {
            return [];
        }
    }

    useEffect(() => {
        loadData().then(r => {
            setUser(r);
            setLoading(false);
        });

        loadPosts().then(r => {
            setPosts(r);
        });
    }, [username]);

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

    if (isLoading) return "Loading...";
    if (!user) return <UnknownPage/>;

    return (
        <>
            <div
                className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                <div className="flex">
                    <a rel="noreferrer" target="_blank"
                       href={user.profile_picture || '/images/profile_pictures/_default_.jpg'}><img
                        className="w-36 aspect-square object-cover h-full rounded-md"
                        src={user.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/></a>
                    <div className="flex flex-col ml-3">
                        <div className="flex">
                            <p className="text-lg">{user.display_name}</p>
                            {user.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                         title={user.display_name + ' is verified'}
                                                         alt="Verified"/>}
                        </div>

                        <p className="text-gray-400 text-sm">@{user.username}</p>

                        {/*<div className="flex flex-col mt-auto">*/}
                        {/*    <p><span*/}
                        {/*        className="profilecount">{foundUser.followers}</span> {foundUser.followers === 1 ? 'follower' : 'followers'}*/}
                        {/*    </p>*/}
                        {/*    <p><span className="profilecount">{foundUser.following}</span> following</p>*/}
                        {/*    <p><span*/}
                        {/*        className="profilecount">{foundUser.posts.length}</span> {foundUser.posts.length === 1 ? 'post' : 'posts'}*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            {displayPosts()}
        </>
    )
}

export default UserPage;