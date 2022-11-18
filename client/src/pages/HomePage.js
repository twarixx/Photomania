import users from "../components/Users";
import Post from "../components/Post";

function HomePage() {
    const posts = users.filter(user => user.username !== 'Esmaybe').flatMap(user => user.posts);

    return (
        <>
            {/*<div*/}
            {/*    className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">*/}
            {/*    <div>*/}
            {/*        <h1 className="header">Feed</h1>*/}
            {/*        <p className="text-sm text-center">Here are the most recent posts by the people you follow.</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {posts.sort((a, b) => b.timestamp - a.timestamp).map(post => {
                return (
                    <>
                        <div
                            className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 h-auto bg-white text-black z-20">
                            <div className="flex justify-center items-center">
                                <Post key={post.id} post={post}
                                      user={users.find(user => user.posts.find(port => port.id === post.id))}
                                      loadLazy={post.index === 1}/>
                            </div>
                        </div>
                    </>
                )
            })
            }
        </>
    );
}

export default HomePage;