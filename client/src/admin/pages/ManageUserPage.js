import {useParams} from "react-router-dom";
import {LoadData} from "../../axios";
import {EditUserDialog} from "../components/dialogs/users/EditUserDialog";
import {ConfirmDeleteDialog} from "../components/dialogs/users/ConfirmDeleteDialog";

export const ManageUserPage = () => {
    const {username} = useParams();

    const user = LoadData(["admin:user", username], `/users/${username}`);
    if (user.isLoading) return <div>Loading...</div>;

    const roles = {
        0: "User",
        1: "Moderator",
        2: "Administrator",
    }

    return (
        <>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row justify-between space-x-4">
                    <div className="bg-white w-1/4 p-4 space-y-4 rounded">
                        <h1 className="text-lg font-semibold">User: {user.data.username}</h1>
                        <div className="flex justify-center">
                            <img className="rounded aspect-square object-cover w-60" src={user.data.profile_picture || '/images/profile_pictures/_default_.jpg'} alt={user.data.id}/>
                        </div>
                    </div>
                    <div className="bg-white w-3/4 p-4 h-fit space-y-4 rounded">
                        <h1 className="text-lg font-semibold">Info</h1>
                        <div className="text-sm">
                            <p>Email: {user.data.email}</p>
                            <p>Username: {user.data.username}</p>
                            <p>Display name: {user.data.display_name}</p>
                            <p>Verified: {user.data.verified === 1 ? "Yes" : "No"}</p>
                            <p>Role: {roles[user.data.role]}</p>
                        </div>
                    </div>
                    <div className="bg-white w-1/4 h-full p-4 space-y-4 rounded">
                        <h1 className="text-lg font-semibold">Manage</h1>
                        <div className="text-white font-semibold flex max-w-xs space-y-2 flex-col">
                            <EditUserDialog user={user.data} refetch={user.refetch()}/>
                            <ConfirmDeleteDialog userId={user.data.id} username={user.data.username} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}