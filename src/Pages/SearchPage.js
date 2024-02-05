import SearchedChannelCart from "../components/SearchedChannelCart";
import VideoCart from "../components/VideoCart"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useFetchSearch from "../hooks/useFetchSearch";
import useFetchVideos from "../hooks/useFetchVideos";
import useFetchChannels from "../hooks/useFetchChannels";

const SearchPage = () => {
    const [query] = useSearchParams();
    useFetchSearch(query.get("q"));
    const list = useSelector(store => store?.query[query.get("q")]);
    let channelsToFetch = [];
    let videosToFetch = [];
    list?.forEach(item => {
        if (item?.type === "video") {
            videosToFetch.push(item?.videoId)
        }
        if (item?.type === "channel") {
            channelsToFetch.push(item?.channelId)
        }
    });
    useFetchVideos(videosToFetch);
    useFetchChannels(channelsToFetch);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);
    return (
        <div className="p-3 flex-1 flex flex-col gap-6">
            {list?.map(item => item?.type === "video" ?
                (<>
                    <VideoCart key={item.videoId} videoId={item.videoId} type={"horizontal"} />
                </>)
                :
                (<SearchedChannelCart key={item.channelId} channelId={item.channelId} />)
            )}
        </div>
    )
}
export default SearchPage;