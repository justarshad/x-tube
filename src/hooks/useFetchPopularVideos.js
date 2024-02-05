import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../store/slices/videos";
import { addPopularVideos } from "../store/slices/popular";
import { YT_VIDEO_API } from "../utils/apiConstent";

const useFetchPopularVideos = () => {
    const dispatch = useDispatch();
    const Existing = useSelector((store => store?.popular?.length > 0 ? true : false));

    return async () => {

        if (!Existing) {
            try {
                const res = await fetch(YT_VIDEO_API
                    + `&part=snippet,statistics,contentDetails`
                    + `&chart=mostPopular`
                    + `&maxResults=50`
                    + `&regionCode=IN`
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
                    dispatch(addPopularVideos(list?.map(item => item?.videoId)))
                }

                const channels = data?.items?.map(item => item?.snippet?.channelId);
                return channels;
            } catch (err) { }
        }
    }
}
export default useFetchPopularVideos;