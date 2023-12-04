import {LoadData} from "../../axios";
import ReactTimeAgo from "react-time-ago";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export const PostsPage = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const {data, isLoading} = LoadData(["admin:posts"], "/posts/all");
    if (isLoading) return "Loading...";

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="mb-4">
                        <form onSubmit={e => navigate(`/panel/post/${search}`)}>
                            <input onChange={e => setSearch(e.target.value)} className="rounded-lg px-4 py-2 text-gray-500 placeholder-gray-500 outline-none" type="text" placeholder="Post ID"/>
                        </form>
                    </div>
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                    ID
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                    Caption
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                    Image
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                    Posted ago
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                >
                                    Posted by
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                >
                                    Manage
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-[#efefef] divide-y divide-gray-200">
                            {data.data.map(post => {
                                return (
                                    <tr key={post.id}>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <Link to={`/post/${post.unique_id}`}>{post.unique_id}</Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {post.caption}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <img className="w-24 aspect-square object-cover" src={post.source} alt={post.unique_id}/>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <ReactTimeAgo date={post.timestamp * 1000}/>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <Link to={`/${post.username}`}>{post.username}</Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <Link to={`/panel/post/${post.unique_id}`}>Manage</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}