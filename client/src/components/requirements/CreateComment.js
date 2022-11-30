import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const CreateComment = ({post}) => {
    const [comment, setComment] = useState("");
    const {currentUser} = useContext(AuthContext);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments/", newComment);
        },
        {
            onSuccess: () => queryClient.invalidateQueries(["comments"]),
        }
    );

    const handleSubmit = async event => {
        event.preventDefault();
        if (!comment) return;

        const newComment = {
            post_id: post.id,
            poster_id: currentUser.id,
            comment: comment,
        }

        mutation.mutate(newComment);

        const commentInput = document.getElementById("post_comment");
        commentInput.value = "";
        commentInput.blur();
        setComment("");
    }

    return (
        <div className="flex mt-auto pt-2 justify-center items-end border-t-[#efefef] border-t-2">
            <div className="mt-3 mb-2 flex-grow relative">
                <div className="absolute flex items-center w-6 ml-2 h-full">
                    <img src="/icons/comment.svg" alt="Search"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <input onChange={event => setComment(event.target.value)} id="post_comment"
                           className="searchbar text-[#8f8f8f] placeholder-[#8f8f8f] rounded-md h-full px-2 pl-10 w-full outline-none border-solid"
                           type="text" placeholder="Create a comment"/>
                </form>
            </div>
        </div>
    )
}

export default CreateComment;