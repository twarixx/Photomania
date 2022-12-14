import '../App.css'
import {Link} from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import {LazyLoadImage} from "react-lazy-load-image-component";


const handleLike = (event) => {
    event.preventDefault();
    event.target.src = "/icons/like-active.svg";
}
const Post = ({post, user, clear = false}) => {
    return (
        <>
            <div className="flex flex-col">
                {!clear && <Link to={`/${user.username}`}>
                    <div className="flex items-center px-4 pb-4 border-b-[#efefef] border-b-2">
                        <img className="w-12 aspect-square object-cover h-full rounded-lg"
                             src={user.profile_picture || '/images/profile_pictures/_default_.jpg'} loading="lazy"
                             alt="Profile Pic"/>
                        <div className="justify-center ml-3">
                            <div className="flex items-center">
                                <p>{user.display_name}</p>
                                {user.verified && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                       title={user.display_name + ' is verified'} alt="Verified"/>}
                            </div>

                            <p className="text-gray-400 text-sm">{post.caption}</p>
                        </div>

                        <div className="ml-auto mr-0 pr-0">
                            <p className="text-md text-gray-700">{<ReactTimeAgo date={post.timestamp * 1000}/>}</p>
                        </div>
                    </div>
                </Link>}

                <Link to={`/post/${post.id}`}>
                    {clear ? <div className="flex justify-center">
                            <LazyLoadImage className="aspect-square object-cover" src={post.source} alt={post.caption}/></div> :
                        <div className="flex mt-6 justify-center"><LazyLoadImage
                            className="object-contain w-5/6 mx-[20px]" src={post.source} alt={post.caption}/></div>}

                </Link>

                {!clear &&
                    <>
                        <div className="flex border-t-[#efefef] border-t-2 p-4 mt-6 pb-0 mb-0"></div>
                        <div className="px-4 flex justify-between">
                            <div className="flex space-x-3">
                                <img onClick={handleLike} className="h-10 w-10" src="/icons/like.svg" alt="Like"/>
                                <Link to={`/post/${post.id}#comments`}><img className="h-10 w-10"
                                                                            src="/icons/comment.svg"
                                                                            alt="Comment"/></Link>
                            </div>

                            <div className="flex">
                                <Link to={`/post/${post.id}`}><img className="h-10 w-10" src="/icons/popout.svg"
                                                                   alt="View post"/></Link>
                            </div>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default Post;