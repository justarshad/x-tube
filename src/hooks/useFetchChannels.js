import { useEffect } from "react";
import { YT_CHANNEL } from "../utils/apiConstent";
import { useDispatch, useSelector } from "react-redux";
import { addChaneels } from "../store/slices/channels";

const useFetchChannels = (channelIds) => {
    const dispatch = useDispatch();
    const existing = useSelector(store => store.channels);
    const ids = channelIds?.filter(item => existing[item]?.videoCount ? false : true)?.join(',');

    useEffect(() => {

        if (ids?.length > 0) {
            (async () => {
                try {
                    const res = await fetch(YT_CHANNEL
                        + `&part=snippet`
                        + `&part=statistics`
                        + `&id=${ids}`
                    );
                    const data = await res.json();

                    const list = data?.items?.map(item => {
                        const { id } = item;
                        const { country, customUrl, description, publishedAt, title } = item?.snippet;
                        const { url } = item?.snippet?.thumbnails?.default;
                        const { viewCount, videoCount, subscriberCount } = item?.statistics;

                        return {
                            channelId: id,
                            country,
                            customUrl,
                            description,
                            title,
                            profileUrl: url,
                            joiningTime: publishedAt,
                            viewCount,
                            videoCount,
                            subscriberCount,
                        }
                    });
                    if (list) {
                        dispatch(addChaneels(list));
                    }
                }
                catch (err) { }
            }
            )();
        }
    }, [channelIds]);
}

export default useFetchChannels;