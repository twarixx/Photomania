import {useParams} from "react-router-dom";
import UnknownPage from "./UnknownPage";
import Post from "../components/Post";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {makeRequest} from "../axios";

function PostPage() {
    const {postId} = useParams();
    const {currentUser} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    const loadData = async () => {
        try {
            const data = await makeRequest.get(`/posts/${postId}`);
            return data.data;
        } catch {
            return null;
        }
    }

    useEffect(() => {
        loadData().then(r => {
            setPost(r);
            setLoading(false);
        });
    }, [postId]);

    if (isLoading) return <div>Loading...</div>;
    if (!post) return <UnknownPage/>;

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div
                className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-fit text-black z-20">
                <div>
                    <Post post={post} clear={false}></Post>
                </div>
            </div>

            <div id="comments"
                className="flex flex-col rounded-none sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white text-black z-20">
                <div className="justify-start">
                    <p className="header">Comments</p>

                    {/*{post.comments.length === 0 ? <p className="text-center text-sm mb-6">There are no comments!</p> : post.comments.sort((c1, c2) => c2.timestamp - c1.timestamp).map(comment => {*/}
                    {/*    return (*/}
                    {/*        <PostsComment comment={comment} post={post} poster={users.find(user => user.username === comment.user)}></PostsComment>*/}
                    {/*    )*/}
                    {/*})}*/}
                </div>

                <div className="flex mt-auto pt-2 justify-center items-end border-t-[#efefef] border-t-2">
                    <div className="mt-3 mb-2 flex-grow relative">
                        <div className="absolute flex items-center w-6 ml-2 h-full">
                            <img src="/icons/comment.svg" alt="Search"/>
                        </div>
                        <form>
                            <input id="post_comment"
                                   className="searchbar text-[#8f8f8f] placeholder-[#8f8f8f] rounded-md h-full px-2 pl-10 w-full outline-none border-solid"
                                   type="text" placeholder="Create a comment"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;