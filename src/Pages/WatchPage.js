
import Ifram from "../components/Ifram";
import CommentsSection from "../components/CommentsSection";
import WatchingVideoInfo from "../components/WatchingVideoInfo";
import useFetchVideos from "../hooks/useFetchVideos";
import useFetchChannels from "../hooks/useFetchChannels";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggleSidebarOpen } from "../store/slices/state";

const WatchPage = () => {

    const dispatch = useDispatch();
    const [quaryParam] = useSearchParams();
    const videoId = quaryParam.get("v");
    const ChannelId = useSelector(store => store?.videos?.[videoId]?.channelId);

    useFetchVideos([videoId]);
    useFetchChannels([ChannelId]);
    useEffect(() => {
        document.documentElement.scrollTop = 0
        dispatch(toggleSidebarOpen(false));
    }, []);
    return (
        <div className="flex-1 flex py-4 px-3">

            <div className="sm:w-[90%] md:w-[80%] lg:w-[70%]">
                <Ifram videoId={videoId} />
                <WatchingVideoInfo videoId={videoId} />
                <CommentsSection videoId={videoId} />
            </div>
            <div className="flex-1"></div>
        </div>
    );
}
export default WatchPage;