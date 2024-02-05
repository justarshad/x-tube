import { YT_VIDEO_API } from "../utils/apiConstent";
import { useDispatch } from "react-redux";
import { addVideos } from "../store/slices/videos";
import { addLikedVideos } from "../store/slices/userInfo";

const useFetchLikedVideos = () => {
    const dispatch = useDispatch();
    return async (nextPageToken) => {

        try {
            const suffix = nextPageToken ? "&pageToken=" + nextPageToken : "";
            const res = await fetch(YT_VIDEO_API
                + `&part=snippet,statistics,contentDetails`
                + `&myRating=like`
                + `&maxResults=50`
                + suffix,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('authInfo')).access_token}`,
                    }
                }
            );

            const data = await res.json();
            const list = data?.items?.map(item => {
                const { publishedAt, channelId, title, description, channelTitle, thumbnails } = item?.snippet;
                const { viewCount, likeCount, commentCount } = item?.statistics
                const { duration, definition } = item?.contentDetails;

                return {
                    videoId: item?.id,
                    viewCount,
                    likeCount,
                    commentCount,
                    duration,
                    definition,
                    publishedAt,
                    channelId,
                    title,
                    description,
                    defaultThumbnail: thumbnails?.default?.url,
                    mediumThumbnail: thumbnails?.medium?.url,
                    highThumbnail: thumbnails?.high?.url,
                    maxresThumbnail: thumbnails?.maxres?.url,
                    channelTitle,
                }
            });

            if (list) {
                dispatch(addVideos(list));
                dispatch(addLikedVideos({
                    totalVideos: data?.pageInfo?.totalResults,
                    nextPageToken: data?.nextPageToken ? data?.nextPageToken : "",
                    list: list?.map(item => item?.videoId)
                }))

            }
            const channels = data?.items?.map(item => item?.snippet?.channelId);
            return channels;
        } catch (err) { }
    }
}
export default useFetchLikedVideos;