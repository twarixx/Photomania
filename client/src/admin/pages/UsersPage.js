import {LoadData} from "../../axios";
import ReactTimeAgo from "react-time-ago";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export const UsersPage = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const {data, isLoading} = LoadData(["admin:users"], "/users/all");
    if (isLoading) return "Loading...";

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="mb-4">
                        <form onSubmit={e => navigate(`/panel/user/${search}`)}>
                            <input onChange={e => setSearch(e.target.value)} className="rounded-lg px-4 py-2 text-gray-500 placeholder-gray-500 outline-none" type="text" placeholder="Username"/>
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
                                    Email
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                    Username
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                    Display name
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                    Profile Picture
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
                            {data.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <Link to={`/${user.username}`}>{user.id}</Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {user.display_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            <img className="w-24 aspect-square object-cover rounded" src={user.profile_picture || '/images/profile_pictures/_default_.jpg'} alt={user.username}/>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                <Link to={`/panel/user/${user.username}`}>Manage</Link>
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