import Post from "./Post";
import {useQuery} from "@tanstack/react-query";
import {makeRequest} from "../axios";

const Posts = () => {

    const {isLoading, error, data} = useQuery(["posts"], () =>
        makeRequest.get("/posts").then((res) => {
            return res.data;
        })
    );

    return error
        ? "Something went wrong"
        : isLoading
            ? "Loading..."
            : !data.length
                ? <div
                    className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 h-auto bg-white text-black z-20">
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <h1 className="font-semibold text-xl">Welcome to your homepage!</h1>
                        <div className="text-center text-sm">
                            <p>Could not find any posts.</p>
                            <p>Consider following someone to make their posts appear here!</p>
                            <p>You can find some random people in the suggested accounts section!</p>
                        </div>
                    </div>
                </div>
                : data.map((post) => {
                    return (
                        <div key={post.id}
                             className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 h-auto bg-white text-black z-20">
                            <div className="flex justify-center items-center">
                                <Post post={post}
                                      loadLazy={post.index === 1}/>
                            </div>
                        </div>
                    )
                });
};

export default Posts;