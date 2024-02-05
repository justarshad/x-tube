import { YT_COMMENT_REPLIES } from "../utils/apiConstent";
import { addCommentReplies } from "../store/slices/commentsReplies";
import { useDispatch } from "react-redux";

const useFetchCommentReplies = (parentId) => {
    const dispatch = useDispatch();

    return async (nextPageToken) => {
        try {
            const suffix = nextPageToken ? "&pageToken=" + nextPageToken : "";
            const res = await fetch(YT_COMMENT_REPLIES
                + `&part=snippet`
                + `&maxResults=100`
                + `&parentId=${parentId}`
                + suffix
            );
            const data = await res.json();

            const list = data?.items?.map((item) => {
                const id = item?.id;
                const { textDisplay, authorDisplayName, authorProfileImageUrl, authorChannelId, likeCount, publishedAt, updatedAt } = item?.snippet;

                return {
                    commentId: id,
                    textDisplay,
                    authorDisplayName,
                    authorProfileImageUrl,
                    authorChannelId: authorChannelId?.value,
                    likeCount,
                    publishedAt,
                    updatedAt
                };
            });
            dispatch(addCommentReplies({
                parentId,
                list,
                nextPageToken: data?.nextPageToken ? data?.nextPageToken : "",
            }));
        } catch (err) { }
    }
}
export default useFetchCommentReplies;