import { useState } from "react";
import { useSelector } from "react-redux";
import useAddComment from "../hooks/useAddComment";
import useAddCommentReply from "../hooks/useAddCommentReply";

const CommentInputBox = ({ videoId, commentId }) => {
    const [commentText, setCommentText] = useState('');
    const userProfileUrl = useSelector(store => store?.userInfo?.picture);
    const commentAdder = useAddComment();
    const commentReplyAdder = useAddCommentReply();
    return (
        <div className="p-3 my-3 border rounded-md border-light_border dark:border-dark_bg_500 ">
            <div className="flex gap-4">
                <img
                    src={userProfileUrl}
                    alt="profile"
                    className="w-12 h-12 rounded-full mt-2"
                />
                <input
                    type="text"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    placeholder="add comment"
                    className="px-4 flex-1 text-lg leading-[1.35rem] outline-none border-b-2 border-red-500
                    dark:bg-dark_bg_700 dark:border-dark_bg_500 text-light_text_800 dark:text-dark_text_800"
                />
            </div>

            {commentText &&
                (<div className="mt-6 flex justify-end">
                    <button
                        onClick={() => (videoId ? commentAdder(videoId, commentText) : commentReplyAdder(commentId, commentText)).then(res => setCommentText(''))}
                        className={`px-4 py-2 rounded-full ${commentText ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"} text-white`}> Submit</button>
                </div>)
            }</div>
    )
}

export default CommentInputBox;