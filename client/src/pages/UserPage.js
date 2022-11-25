import {useLocation} from "react-router-dom";
import {makeRequest} from "../axios";
import {useContext, useEffect, useState} from "react";
import UnknownPage from "./UnknownPage";
import Post from "../components/Post";
import {AuthContext} from "../context/AuthContext";

function UserPage() {
    const {currentUser} = useContext(AuthContext);

    const username = useLocation().pathname.split("/")[1];
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [following, setFollowing] = useState([]);

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

    const handleButton = event => {
        event.preventDefault();

        const isFollowing = (following.includes(currentUser.id));
        if (isFollowing) {
            return setFollowing(following.filter((follow) => follow !== currentUser.id));
        }

        return setFollowing([...following, currentUser.id]);
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

                        <div className="flex flex-col mt-3">
                            <p><span className="profilecount">0 </span>  {0 ? 'follower' : 'followers'}</p>
                            <p><span className="profilecount">0 </span>  following</p>
                            <p><span className="profilecount">0 </span>  {0 ? 'post' : 'posts'}</p>
                        </div>
                    </div>
                    <div className="sm:absolute flex flex-col-reverse sm:flex-row items-end sm:items-start sm:justify-end sm:right-5 items-start w-full text-gray-200 font-semibold">
                        <div>
                            {currentUser.username === user.username
                                ? <button className="bg-[#A855F7] p-2 px-6 rounded-md">Manage</button>
                                : following.includes(currentUser.id)
                                    ? <button onClick={handleButton} className="bg-gray-500 p-2 px-4 rounded-md">Unfollow</button>
                                    : <button onClick={handleButton} className="bg-[#A855F7] p-2 px-6 rounded-md">Follow</button>}
                        </div>
                    </div>
                </div>
            </div>

            {displayPosts()}
        </>
    )
}

export default UserPage;