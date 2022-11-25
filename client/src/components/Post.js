import '../App.css'
import {Link} from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {makeRequest} from "../axios";
import {useQuery} from "@tanstack/react-query";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";


const Post = ({post, clear = false}) => {
    const {currentUser} = useContext(AuthContext);
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLike = (liked) => {
        if (liked) {
            setLikes(likes.filter((like) => like !== currentUser.id));
            makeRequest.delete(`/likes?postId=${post.id}`);
        } else {
            setLikes([...likes, currentUser.id]);
            makeRequest.post(`/likes?postId=${post.id}`);
        }
    }

    const loadLikes = async () => {
        try {
            const data = await makeRequest.get(`/likes?postId=${post.id}`);
            return data.data;
        } catch {
            return [];
        }
    }

    useEffect(() => {
        return () => {
            loadLikes().then(likes => {
                setLikes(likes);
                setLoading(false);
                console.log(likes);
            });
        };
    }, [post.id]);


    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="flex flex-col">
                {!clear && <Link to={`/${post.username}`}>
                    <div className="flex items-center px-4 pb-4 border-b-[#efefef] border-b-2">
                        <img className="w-12 aspect-square object-cover h-full rounded-lg"
                             src={post.profile_picture || '/images/profile_pictures/_default_.jpg'} loading="lazy"
                             alt="Profile Pic"/>
                        <div className="justify-center ml-3">
                            <div className="flex items-center">
                                <p>{post.display_name}</p>
                                {post.verified === 1 && <img className="w-5 ml-0 mb-2" src="/icons/verified.svg"
                                                             title={post.display_name + ' is verified'}
                                                             alt="Verified"/>}
                            </div>

                            <p className="text-gray-400 text-sm">{post.caption}</p>
                        </div>

                        <div className="ml-auto pl-1 mr-0 pr-0">
                            <p className="text-md text-gray-700">{<ReactTimeAgo date={post.timestamp * 1000}/>}</p>
                        </div>
                    </div>
                </Link>}

                <Link to={`/post/${post.unique_id}`}>
                    {clear ? <div className="flex justify-center">
                            <LazyLoadImage className="aspect-square object-cover" src={post.source} alt={post.caption}/>
                        </div> :
                        <div className="flex mt-6 justify-center"><LazyLoadImage
                            className="object-contain w-5/6 mx-[20px]" src={post.source} alt={post.caption}/></div>}

                </Link>

                {!clear &&
                    <>
                        <div className="flex border-t-[#efefef] border-t-2 p-4 mt-6 pb-0 mb-0"></div>
                        <div className="px-4 flex justify-between">
                            <div className="flex space-x-3">
                                <div className="relative pb-4">
                                    <img onClick={e => handleLike(likes.includes(currentUser.id))} className="h-10 w-10"
                                         src={likes.includes(currentUser.id) ? "/icons/like-active.svg" : "/icons/like.svg"}
                                         alt="Like" title="Like"/>
                                    <div
                                        className="absolute flex bottom-11 -right-1.5 items-center justify-center bg-purple-500 rounded-full text-white w-4 h-4 text-xs">{likes.length}
                                    </div>
                                </div>

                                <Link to={`/post/${post.unique_id}`}><img className="h-10 w-10"
                                                                          src="/icons/comment.svg"
                                                                          alt="Comment"/></Link>
                            </div>

                            <div className="flex">
                                <Link to={`/post/${post.unique_id}`}><img className="h-10 w-10" src="/icons/popout.svg"
                                                                          alt="View post"/></Link>
                            </div>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default Post;