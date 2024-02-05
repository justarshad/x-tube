import { useDispatch } from "react-redux";
import { addComment } from "../store/slices/userInfo";
import { ADD_COMMENT } from "../utils/apiConstent";

const useAddComment = () => {
    const dispatch = useDispatch();

    return async (videoId, commentText) => {
        try {
            const res = await fetch(ADD_COMMENT + `?part=snippet`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('authInfo')).access_token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    snippet: {
                        videoId,
                        topLevelComment: { snippet: { textOriginal: commentText } }
                    }
                }),
            });

            const data = await res.json();

            const { id } = data;
            const { channelId, canReply, totalReplyCount, isPublic } = data?.snippet;
            const { textDisplay, authorDisplayName, authorProfileImageUrl, authorChannelId, likeCount, publishedAt, updatedAt } = data?.snippet?.topLevelComment?.snippet;

            const obj = {
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

            dispatch(addComment(obj));
            return 'done';
        } catch (err) { }
    }
};

export default useAddComment;