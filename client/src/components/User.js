import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../axios";
import UnknownPage from "../pages/UnknownPage";
import {useEffect} from "react";

const User = ({username}) => {
    const {isLoading, error, data} = useQuery(["user"], () =>
        makeRequest.get(`/users/${username}`).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries(["user"]).then(r => console.log(r));
    });

    function displayData() {
        if (!data) return <UnknownPage/>;

        console.log(data);

        return (
            <>
                <div
                    className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                    <div className="flex">
                        <a rel="noreferrer" target="_blank"
                           href={data.profile_picture || '/images/profile_pictures/_default_.jpg'}><img
                            className="w-36 aspect-square object-cover h-full rounded-md"
                            src={data.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/></a>
                        <div className="flex flex-col ml-3">
                            <div className="flex">
                                <p className="text-lg">{data.display_name}</p>
                                {data.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                             title={data.display_name + ' is verified'}
                                                             alt="Verified"/>}
                            </div>

                            <p className="text-gray-400 text-sm">@{data.username}</p>

                            {/*<div className="flex flex-col mt-auto">*/}
                            {/*    <p><span*/}
                            {/*        className="profilecount">{foundUser.followers}</span> {foundUser.followers === 1 ? 'follower' : 'followers'}*/}
                            {/*    </p>*/}
                            {/*    <p><span className="profilecount">{foundUser.following}</span> following</p>*/}
                            {/*    <p><span*/}
                            {/*        className="profilecount">{foundUser.posts.length}</span> {foundUser.posts.length === 1 ? 'post' : 'posts'}*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

                {/*{displayPosts()}*/}
            </>
        )
    }

    if (error) return <UnknownPage />;
    if (isLoading) return "Loading...";
    return displayData();
}

export default User;