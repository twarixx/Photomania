import {useParams} from "react-router-dom";
import users from "../components/Users";
import UnknownPage from "./UnknownPage";
import Post from "../components/Post";

function PostPage() {
    const {postid} = useParams();

    const post = users.flatMap(user => user.posts).find(post => post.id === postid);
    if (!post) return <UnknownPage/>;

    const user = users.find(user => user.posts.find(port => port.id === post.id));

    return (
        <div
            className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
            <div>
                <Post post={post} user={user} clear={false}></Post>
            </div>
        </div>
    );
}

export default PostPage;