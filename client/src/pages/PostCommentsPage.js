import {useParams} from "react-router-dom";

function PostPage() {
    const {postid} = useParams();

    return (
        <div
            className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
            <div>
                <h1 className="header">Post: {postid}</h1>
            </div>
        </div>
    );
}

export default PostPage;