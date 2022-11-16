import {useParams} from "react-router-dom";
import UnknownPage from "./UnknownPage";
import users from "../components/Users";

function UserPage() {
    const {username} = useParams();

    const foundUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (!foundUser) return <UnknownPage/>;

    return (
        <>
            <h1>User Page</h1>
            <p>Username: {foundUser.username}</p>
            <a target="_blank" rel="noreferrer"
               href={foundUser.profile_picture || '/images/profile_pictures/_default_.jpg'}><img
                className="aspect-square object-cover rounded-full w-1/12"
                src={foundUser.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/></a>
        </>
    )
}

export default UserPage;