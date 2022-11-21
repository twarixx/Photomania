import {useParams} from "react-router-dom";
import users from "../components/Users";
import UnknownPage from "./UnknownPage";
import Post from "../components/Post";
import PostsComment from "../components/PostsComment";

function PostPage() {
    const {postId} = useParams();

    const post = users.flatMap(user => user.posts).find(post => post.id === postId);
    if (!post) return <UnknownPage/>;

    const user = users.find(user => user.posts.find(port => port.id === post.id));

    return (
        <div
            className={"grid-cols-1 lg:grid-cols-2 grid gap-3 h-auto"}>
            <div
                className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                <div>
                    <Post post={post} user={user} clear={false}></Post>
                </div>
            </div>

            <div
                className="flex flex-col rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-full text-black z-20">
                <div className="justify-start">
                    <p className="header">Comments</p>

                    {post.comments.length === 0 ? <p className="text-center text-sm">There are no comments!</p> :post.comments.map(comment => {
                        return (
                            <PostsComment comment={comment} post={post} poster={users.find(user => user.username === comment.user)}></PostsComment>
                        )
                    })}
                </div>

                <div className="flex mt-auto pt-2 justify-center items-end border-t-[#efefef] border-t-2">
                        <input className="w-full h-auto py-3 text-[#8f8f8f] placeholder=[#8f8f8f] outline-none pl-3"
                               type="text"
                               placeholder="Create a comment"/>
                </div>
            </div>
        </div>
    );
}

export default PostPage;