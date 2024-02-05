import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YT_VIDEO_API } from "../utils/apiConstent";
import { addVideos } from "../store/slices/videos";

const useFetchVideos = (videoIds) => {
    const dispatch = useDispatch();
    const existing = useSelector(store => store?.videos);
    const ids = videoIds?.filter(id => existing?.[id] ? false : true).join(',');

    useEffect(() => {
        (async () => {
            if (ids?.length > 0) {
                try {
                    const res = await fetch(YT_VIDEO_API
                        + `&part=snippet`
                        + `&part=statistics`
                        + `&part=contentDetails`
                        + `&id=${ids}`);
                    const data = await res.json();

                    const list = data?.items?.map(item => {
                        const { publishedAt, channelId, title, description, channelTitle } = item?.snippet;
                        const { viewCount, likeCount, commentCount } = item?.statistics
                        const { duration, definition } = item?.contentDetails

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
                            defaultThumbnail: item?.snippet?.thumbnails?.default?.url,
                            mediumThumbnail: item?.snippet?.thumbnails?.medium?.url,
                            highThumbnail: item?.snippet?.thumbnails?.high?.url,
                            maxresThumbnail: item?.snippet?.thumbnails?.maxres?.url,
                            channelTitle,
                        }
                    })

                    if (list) {
                        dispatch(addVideos(list));
                    }
                } catch (err) { }
            }
        })();

    }, [videoIds]);
};

export default useFetchVideos;