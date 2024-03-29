import {useParams} from "react-router-dom";
import Post from "../components/requirements/Post";
import {LoadData} from "../axios";
import UnknownPage from "./UnknownPage";
import PostsComment from "../components/PostsComment";
import CreateComment from "../components/requirements/CreateComment";

function PostPage() {
    const {postId} = useParams();

    const post = LoadData(["post", postId], `/posts/${postId}`);
    const comments = LoadData(["post:comments", postId], `/comments/${postId}`);

    if (post.isLoading || comments.isLoading) return <div>Loading...</div>;
    if (post.error) return <UnknownPage/>;

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div
                className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-fit text-black z-20">
                <div>
                    <Post post={post.data} clear={false}></Post>
                </div>
            </div>

            <div id="comments"
                className="flex flex-col rounded-none sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white text-black z-20">
                <div className="justify-start">
                    <p className="header">Comments</p>

                    {comments.data.length === 0 ? <p className="text-center text-sm mb-6">There are no comments!</p> : comments.data.map(comment => {
                        return (
                            <PostsComment key={comment.commentId} comment={comment}></PostsComment>
                        )
                    })}
                </div>

                <CreateComment post={post.data} />
            </div>
        </div>
    );
}

export default PostPage;