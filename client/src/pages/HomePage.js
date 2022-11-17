import users from "../components/Users";
import Post from "../components/Post";

function HomePage() {
    return (
        <div>
            <h1 className="header">Home Page</h1>
            <p className="text-sm text-center">No posts found, do you follow any accounts?</p>

            <div className="space-y-6 flex flex-wrap">
                {users.filter(user => user.posts && !user.posts.isEmpty).map(user => {
                    return user.posts.map(post => {
                        return <Post key={post.id} post={post} user={user}/>
                    })
                })
                }
            </div>
        </div>
    );
}

export default HomePage;