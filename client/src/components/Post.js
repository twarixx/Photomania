import '../App.css'
import {Link} from "react-router-dom";

const handleLike = (event) => {
    event.preventDefault();
    event.target.src = "/icons/like-active.svg";
}

const Post = ({post, user}) => {
    return (
        <>
            <div className="flex flex-col">
                <Link to={`/${user.username}`}>
                    <div className="flex items-center px-4 pb-4 border-b-[#efefef] border-b-2">
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

                <div className="flex border-t-[#efefef] border-t-2 p-4 mt-6 pb-0 mb-0"></div>
                <div className="px-4 flex justify-between">
                    <div className="flex space-x-3">
                        <img onClick={handleLike} className="h-10 w-10" src="/icons/like.svg" alt="Like"/>
                        <Link to={`/post/${post.id}/comments`}><img className="h-10 w-10" src="/icons/comment.svg" alt="Comment"/></Link>
                    </div>

                    <div className="flex">
                        <Link to={`/post/${post.id}`}><img className="h-10 w-10" src="/icons/popout.svg" alt="View post"/></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;