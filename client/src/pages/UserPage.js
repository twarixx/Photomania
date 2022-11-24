import {useParams} from "react-router-dom";
import User from "../components/User";
function UserPage() {
    const {username} = useParams();

    return <User username={username}/>;

    // function displayPosts() {
    //     if (foundUser.posts.length === 0) {
    //         return (
    //             <div
    //                 className="rounded-none sm:rounded-md mx-[3px] px-4 py-5 h-auto bg-white text-black z-20">
    //                 <div className="flex justify-center items-center">
    //                     <p>This user has no posts!</p>
    //                 </div>
    //             </div>
    //         )
    //     }
    //
    //     return (
    //         <div
    //             className={(foundUser.posts.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1") + " grid gap-3 h-full"}>
    //             {foundUser.posts.sort((a, b) => b.timestamp - a.timestamp).map(post => {
    //                 return (
    //                     <div key={`P-` + post.id}
    //                         className="flex justify-center items-center rounded-none sm:rounded-md px-4 py-5 m-auto w-full h-full bg-white text-black z-20">
    //                         <Post key={post.id} post={post} user={foundUser} clear={true}/>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     )
    // }
}

export default UserPage;