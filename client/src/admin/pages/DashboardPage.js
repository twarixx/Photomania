import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

export const DashboardPage = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <div>
            <h1 className="text-xl font-semibold">Welcome to the Admin Dashboard, {currentUser.username}!</h1>
            <p className="text-gray-500">Please select a page in the left sidebar!</p>
        </div>
    )
}