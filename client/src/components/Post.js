import '../App.css'
import {Link} from "react-router-dom";

const Post = ({post, user}) => {
    return (
        <>
            <div className="flex flex-col">
                <Link to={`/${user.username}`}>
                    <div className="flex items-center p-4 border-b-[#efefef] border-b-2">
                        <img className="w-12 aspect-square object-cover h-full rounded-lg"
                             src={user.profile_picture} loading="lazy" alt="Profile Pic"/>
                        <div className="justify-center ml-3">
                            <h1 className="text-md font-semibold">{user.display_name}</h1>
                            <p className="text-gray-400 text-sm">{post.caption}</p>
                        </div>
                    </div>
                </Link>

                <div className="flex mt-6 justify-center">
                    <img className="w-4/6 object-cover" loading="lazy" src={post.source} alt={post.caption}/>
                </div>

                <div className="border-t-[#efefef] border-t-2 p-4 mt-6 mb-0 pb-0">
                    <div className="flex justify-center space-x-5">
                        <img src="/icons/like.svg" alt="Like"/>
                        <img src="/icons/comment.svg" alt="Comment"/>
                        <img src="/icons/popout.svg" alt="View post"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;