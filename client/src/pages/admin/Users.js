import {useParams} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import UnknownPage from "../UnknownPage";

export const Users = () => {
    const {username} = useParams();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const {isLoading, error, data: user} = useQuery(["panel_users", username], () =>
        makeRequest.get(`/users/${username}`).then((res) => {
            return res.data;
        })
    );

    if (!username) {

        const handleSubmit = event => {
            event.preventDefault();

            if (!search) return;

            navigate(`/panel/users/${search}`);
        }

        return (
            <>
                <div className="bg-white w-2/6 rounded p-4 space-y-2 text-sm">
                    <h1 className="text-lg font-semibold">Search user</h1>
                    <p>Manage any user by searching for their username.</p>
                    <div>
                        <form className="flex flex-col space-y-2">
                            <input onChange={event => setSearch(event.target.value)} className="bg-[#eaeaea] p-2 pl-4 rounded outline-none text-[#8f8f8f] placeholder-[#8f8f8f]" type="text" placeholder="Username"/>
                            <button onClick={handleSubmit} className="bg-sky-700 text-white p-2 rounded">Search</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    if (error) return "Something went wrong";
    if (isLoading) return "Loading...";
    if (!user) return <UnknownPage />;

    return (
        <>
            <h1>User: {user.display_name}</h1>
        </>
    )
};