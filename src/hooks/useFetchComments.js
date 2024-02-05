import { YT_COMMENTS } from "../utils/apiConstent";
import { useDispatch } from "react-redux";
import { addComments } from "../store/slices/comments";

const useFetchComments = (videoId) => {
    const dispatch = useDispatch();

    return async (nextPageToken) => {

        try {
            const suffix = nextPageToken ? "&pageToken=" + nextPageToken : "";
            const res = await fetch(YT_COMMENTS
                + `&part=snippet`
                + `&order=relevance`
                + `&maxResults=100`
                + `&videoId=${videoId}`
                + suffix
            );
            const data = await res.json();

            const list = data?.items?.map((item) => {
                const { id } = item;
                const { channelId, videoId, canReply, totalReplyCount, isPublic } = item?.snippet;
                const { textDisplay, authorDisplayName, authorProfileImageUrl, authorChannelId, likeCount, publishedAt, updatedAt } = item?.snippet?.topLevelComment?.snippet;

                return {
                    commentId: id,
                    textDisplay,
                    authorDisplayName,
                    authorProfileImageUrl,
                    authorChannelId: authorChannelId?.value,
                    totalReplyCount,
                    canReply,
                    isPublic,
                    likeCount,
                    publishedAt,
                    updatedAt,
                    channelId,
                    videoId,
                };
            });
            dispatch(addComments({
                videoId,
                items: list,
                nextPageToken: data?.nextPageToken ? data?.nextPageToken : "",
            }));
            return "";
        }
        catch (err) { }
    }
}
export default useFetchComments;