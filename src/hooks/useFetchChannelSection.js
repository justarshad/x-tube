import { useEffect } from "react";
import { YT_CHANNEL_SECTION } from "../utils/apiConstent"
import { useDispatch, useSelector } from "react-redux";
import { addChannelSection } from "../store/slices/channels";

const useFetchChannelSection = (channelId) => {
    const dispatch = useDispatch();
    const isExist = useSelector(store => store?.channels?.[channelId]?.channelSection ? true : false);
    useEffect(() => {
        if (!isExist) {
            (
                async () => {
                    try {
                        const res = await fetch(YT_CHANNEL_SECTION +
                            `&part=snippet,contentDetails` +
                            `&channelId=${channelId}`
                        );
                        const data = await res.json();

                        const list = data?.items?.map(item => {
                            if (item?.snippet?.type === "singleplaylist") {
                                return {
                                    type: item?.snippet?.type,
                                    playlistsId: item?.contentDetails?.playlists[0],
                                }
                            }
                            if (item?.snippet?.type === "multiplechannels") {
                                return {
                                    type: item?.snippet?.type,
                                    title: item?.snippet?.title,
                                    channelsList: item?.contentDetails?.channels
                                }
                            }
                        });
                        dispatch(addChannelSection({ list, channelId }))
                    }
                    catch (err) { }
                }
            )();
        }
    }, []);
}
export default useFetchChannelSection;