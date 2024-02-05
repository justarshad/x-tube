import Comment from "./Comment";
import RepliesArrowIcon from "../assets/icons/RepliesArrow";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetchCommentReplies from "../hooks/useFetchCommentsReplies";

const CommentReplies = ({ parentId, totalReplies }) => {
    const [pageCount, setPageCount] = useState(1);
    const replies = useSelector(store => store?.commentsReplies?.[parentId]);
    const items = replies?.items.slice(0, 10 * pageCount);
    const getReplies = useFetchCommentReplies(parentId);

    useEffect(() => {
        if (!replies) {
            getReplies();
        }
        if (replies?.items?.length === items?.length && totalReplies > replies?.items?.length) {
            getReplies(replies?.nextPageToken);
        }
    }, [pageCount]);
    return (
        <div>
            {items?.map(item => (<Comment key={item?.commentId} data={item} />))}

            {items?.length !== totalReplies
                && (
                    <button
                        className="flex gap-4 px-4 py-2 rounded-full font-medium cursor-pointer text-light_blue_200 
                        hover:bg-light_blue_00"
                        onClick={() => setPageCount(pre => pre + 1)}
                    >
                        <span className="rotate-180">
                            <RepliesArrowIcon />
                        </span>
                        Load more replies
                    </button>
                )}

        </div>
    );
}

export default CommentReplies;