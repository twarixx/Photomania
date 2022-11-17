import '../App.css'

const Post = ({post, user}) => {
    return (
        <>
            <div className="w-2/4 flex flex-col items-center bg-[#efefef] border-[#a7a7a7] border-2">
                <p><span className="font-semibold">{user.display_name}: </span>{post.caption}</p>
                <img className="w-2/4 h-full object-cover" loading="lazy" src={post.source} alt={post.caption}/>
            </div>
        </>
    )
}

export default Post;