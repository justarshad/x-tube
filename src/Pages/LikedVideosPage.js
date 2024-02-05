import { useEffect, useState } from "react";
import useFetchLikedVideos from "../hooks/useFetchLikedVideos";
import { useSelector } from "react-redux";
import VideoCart from "../components/VideoCart";
import Loader from "../components/Loader";
import useFetchChannels from "../hooks/useFetchChannels";

const LikedVideosPage = () => {
    const [fetchingState, setFetchingState] = useState("");
    const getVideos = useFetchLikedVideos();
    const [channels, setChannels] = useState([]);
    const isUserAuthenticated = useSelector(store => store?.states?.isUserAuthenticated);
    const videos = useSelector(store => store?.userInfo?.likedVideos?.list);
    const nextPageToken = useSelector(store => store?.userInfo?.likedVideos?.nextPageToken);
    const totalVideos = useSelector(store => store?.userInfo?.likedVideos?.totalVideos);
    useFetchChannels(channels);
    useEffect(() => {
        const element = document.getElementById("likedVideosInfiniteScroll");
        let status = "";
        const observer = new IntersectionObserver((items, obs) => {

            if (!status && items[0].isIntersecting) {

                if (!nextPageToken && videos?.length > 0) {
                    return;
                }
                setFetchingState("loading");
                status = "loading";
                getVideos(nextPageToken).then((list) => {
                    setChannels(list);
                    status = "";
                    setFetchingState("");
                });
                obs.unobserve(items[0].target);
            }
        },
            {
                rootMargin: "250px"
            });
        observer.observe(element);
    }, [nextPageToken]);
    return (
        <div className="p-2 flex flex-col gap-4">
            <h1 className="text-[1.6rem] font-bold text-light_text_1000 dark:text-dark_text_1000"> Your Liked Videos</h1>
            <h2 className="text-[1rem] font-bold text-light_text_900 dark:text-dark_text_900">{`${totalVideos} videos`}</h2>
            {videos?.map(item => (<VideoCart videoId={item} key={item} type={"horizontal"} />))}
            {!isUserAuthenticated && (
                <div>
                    <h4 className=" pb-3 text-light_text_900 dark:text-dark_text_900 border-b-2 border-light_text_900 border:text-dark_text_900">
                        Please! Login with your Youtube Account to see your liked Videos
                    </h4>
                </div>
            )}
            <div id="likedVideosInfiniteScroll"></div>
            {fetchingState === "loading" && (<Loader />)}
        </div>
    )
}

export default LikedVideosPage;