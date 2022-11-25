import '../App.css'
import {Link} from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const PostsComment = ({comment}) => {
    return (
        <>
            <div className="flex flex-col">
                <Link to={'/' + comment.username} className="flex items-center p-4">
                    <img className="w-14 aspect-square object-cover h-full rounded-lg"
                         src={comment.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                    <div className="justify-center ml-3">
                        <div className="flex items-center">
                            <p>{comment.display_name}</p>
                            {comment.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                     title={comment.display_name + ' is verified'} alt="Verified"/>}
                        </div>
                        <p className="text-gray-400 text-sm">{comment.comment}</p>
                    </div>
                    <div className="text-center items-center justify-center ml-auto pl-3 mr-0 pr-0">
                        <p className="text-sm text-gray-700">{<ReactTimeAgo date={comment.posted_on * 1000}/>}</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default PostsComment;