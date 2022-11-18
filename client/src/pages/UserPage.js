import {useParams} from "react-router-dom";
import UnknownPage from "./UnknownPage";
import users from "../components/Users";

function UserPage() {
    const {username} = useParams();

    const foundUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (!foundUser) return <UnknownPage/>;

    return (
        <>
            <div
                className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                <h1 className="header">{foundUser.display_name}</h1>

            </div>
        </>
    )
}

export default UserPage;