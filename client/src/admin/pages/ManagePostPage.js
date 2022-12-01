import {useParams} from "react-router-dom";
import {LoadData} from "../../axios";
import ReactTimeAgo from "react-time-ago";
import {ConfirmDeleteDialog} from "../components/dialogs/ConfirmDeleteDialog";

export const ManagePostPage = () => {
    const {id} = useParams();

    const post = LoadData(["admin:post", id], `/posts/${id}`);

    if (post.isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row justify-between space-x-4">
                    <div className="bg-white w-3/6 p-4 space-y-4 rounded">
                        <h1 className="text-lg font-semibold">Post: {id}</h1>
                        <img className="rounded" src={post.data.source} alt={post.data.unique_id}/>
                    </div>
                    <div className="bg-white w-2/6 p-4 h-fit space-y-4 rounded">
                        <h1 className="text-lg font-semibold">Info</h1>
                        <div className="text-sm">
                            <p>Caption: {post.data.caption}</p>
                            <p>Location: {post.data.source}</p>
                            <p>Posted: <ReactTimeAgo date={post.data.timestamp * 1000}/></p>
                            <p>Posted by: {post.data.username}</p>
                        </div>
                    </div>
                    <div className="bg-white w-1/6 h-full p-4 space-y-4 rounded">
                        <h1 className="text-lg font-semibold">Manage</h1>
                        <div className="text-white font-semibold flex max-w-xs space-y-2 flex-col">
                            <button className="bg-orange-500 py-2 px-4 rounded">Edit</button>
                            <ConfirmDeleteDialog location={post.data.source} uniqueId={post.data.unique_id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}