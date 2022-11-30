import Post from "./requirements/Post";
import {LoadInfiniteData} from "../axios";
import {Fragment, useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {useInView} from "react-intersection-observer";

const Posts = () => {
    const {currentUser} = useContext(AuthContext);
    const {ref, inView} = useInView();

    const {data, isLoading, error, fetchNextPage, hasNextPage} = LoadInfiniteData(["posts", currentUser.username], "/posts");

    useEffect(() => {
        if (inView) fetchNextPage();
        // eslint-disable-next-line
    }, [inView]);

    if (error) return "Something went wrong";
    if (isLoading) return "Loading...";

    console.log(data)

    if (!data || !data.pages[0].data.length) {
        return (
            <div
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
        )
    }

    return (
        <>
            {data.pages.map((page) => (
                <Fragment key={page.nextId}>
                    {page.data.map((post) => (
                        <div key={post.id}
                             className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 h-auto bg-white text-black z-20">
                            <div className="flex justify-center items-center">
                                <Post post={post}
                                      loadLazy={post.index === 1}/>
                            </div>
                        </div>
                    ))}
                </Fragment>
            ))}

            <div className="text-center text-sm mt-2 text-gray-500" ref={ref}>{!hasNextPage && "End of feed"}</div>
        </>
    )
};

export default Posts;