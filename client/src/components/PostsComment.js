import '../App.css'
import {Link} from "react-router-dom";

const PostsComment = ({comment, poster, post}) => {
    return (
        <>
            <div className="flex flex-col">
                <Link to={'/' + poster.username} className="flex items-center p-4">
                    <img className="w-14 aspect-square object-cover h-full rounded-lg"
                         src={poster.profile_picture || '/images/profile_pictures/_default_.jpg'} alt="Profile Pic"/>
                    <div className="justify-center ml-3">
                        <div className="flex items-center">
                            <p>{poster.display_name}</p>
                            {poster.verified && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                     title={poster.display_name + ' is verified'} alt="Verified"/>}
                        </div>
                        <p className="text-gray-400 text-sm">{comment.comment}</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default PostsComment;