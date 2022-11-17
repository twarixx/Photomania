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
            <div className="flex items-center">
                <p>Username: {foundUser.username}</p>
                {foundUser.verified && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg" title={foundUser.username + ' is verified!'} alt="Verified"/>}
            </div>

            <div className="w-1/12" >
                <a target="_blank" rel="noreferrer"
                   href={foundUser.profile_picture || '/images/profile_pictures/_default_.jpg'}><img
                    className="aspect-square object-cover rounded-full"
                    src={foundUser.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/></a>
            </div>
        </>
    )
}

export default UserPage;