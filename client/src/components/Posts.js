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