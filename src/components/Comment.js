import LikeIcon from "../assets/icons/Like";
import CommentArrow from "../assets/icons/CommentArrow";
import { countHandler, howOldTimeHandler } from "../utils/functions";
import CommentReplies from "./CommentReplies";
import { useEffect, useState } from "react";
import CommentInputBox from "./CommentInputBox";
import { useSelector } from "react-redux";

const Comment = ({ data }) => {
    const [showReplis, setShowReplies] = useState(false);
    const [showInputBox, setShowInputBox] = useState(false);
    const isUserAuthenticated = useSelector(store => store.states.isUserAuthenticated);
    const { commentId, authorProfileImageUrl, authorDisplayName, publishedAt, textDisplay, likeCount, totalReplyCount, canReply } = data;

    useEffect(() => {
        const element = document.getElementById(commentId);
        element.innerHTML = textDisplay;
    }, []);

    return (
        <div className="flex gap-2 p-3 my-3 rounded-md border-light_border dark:border-dark_bg_500 ">
            <img
                src={authorProfileImageUrl}
                alt="profile"
                className="w-6 h-6 rounded-full mt-2"
            />
            <div className="w-full">
                <span className="text-base font-medium mr-2 text-primaryTextColor text-light_text_900 dark:text-dark_text_900">
                    {authorDisplayName}
                </span>
                <span className="text-primaryTextColorLight text-light_text_800 dark:text-dark_text_800">
                    {howOldTimeHandler(publishedAt)}
                </span>
                <h3 id={commentId}
                    className="text-primaryTextColorLight text-light_text_600 dark:text-dark_text_600"
                ></h3>
                <div className="flex mt-4 items-center">
                    <LikeIcon />
                    <span
                        className="ml-1 font-medium text-light_text_600 dark:text-dark_text_600"
                    >
                        {countHandler(likeCount)}
                    </span>
                    <span className=" rotate-180 ml-4"><LikeIcon /></span>
                    {canReply &&
                        (<button
                            onClick={() => setShowInputBox(isUserAuthenticated ? true : false)}
                            className={`
                            py-1 px-4 ml-[1.8rem]
                            text-sm font-medium
                            rounded-full delay-100
                            ${isUserAuthenticated ? "cursor-pointer" : "cursor-not-allowed"}
                            text-light_text_800 dark:text-dark_text_800
                          bg-light_bg_20 dark:bg-dark_bg_100
                          hover:bg-light_bg_50 hover:dark:bg-dark_bg_200`}
                        >
                            Replay
                        </button>)
                    }
                </div>
                {showInputBox && (<CommentInputBox commentId={commentId} />)}
                {totalReplyCount > 0 &&
                    (
                        <div className="ml-4 mt-4">
                            <div className="
                            px-2 py-1 w-fit 
                            flex items-center
                            font-medium cursor-pointer rounded-full 
                            text-light_blue_200 
                            hover:bg-light_blue_00 
                            "
                                onClick={() => setShowReplies(pre => !pre)}
                            >
                                <CommentArrow width={"1.5rem"} />
                                <span >
                                    {totalReplyCount} replies
                                </span>
                            </div>
                            {showReplis && (<CommentReplies parentId={commentId} totalReplies={totalReplyCount} />)}
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Comment;