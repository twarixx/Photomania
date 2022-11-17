import {useParams} from "react-router-dom";

function PostPage() {
    const {postid} = useParams();

    return (
        <div>
            <h1 className="header">Post: {postid}</h1>
        </div>
    );
}

export default PostPage;