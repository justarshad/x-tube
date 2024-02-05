import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useFetchPlaylists from "../hooks/useFetchPlaylists";
import { howOldTimeHandler } from "../utils/functions";
import useFetchPlaylistItems from "../hooks/useFetchPlaylistItems";
import useFetchVideos from "../hooks/useFetchVideos";
import VideoCart from "../components/VideoCart";
import useFetchChannels from "../hooks/useFetchChannels";

const PlaylistPage = () => {
    const [query] = useSearchParams();
    const playlistId = query.get("list");
    const getPlaylistItems = useFetchPlaylistItems(playlistId);
    const deviceSize = useSelector(store => store?.states?.deviceSize);
    const playlist = useSelector(store => store?.playlists?.[playlistId]?.info);
    const nextPageToken = useSelector(store => store?.playlists?.[playlistId]?.nextPageToken);
    const playlistVideos = useSelector(store => store?.playlists?.[playlistId]?.items);

    const deviceWidth = (deviceSize === "ph" ? "lessThenMedium" : deviceSize === "sm" ? "lessThenMedium" : deviceSize === "md" ? "lessThenMedium" : "moreThenMedium");

    useFetchPlaylists([playlistId]);
    useFetchVideos(playlistVideos);
    useFetchChannels([playlist?.channelId]);
    useEffect(() => {
        let status = "";

        const observer = new IntersectionObserver((element, obs) => {
            if (!status && element[0].isIntersecting && (!playlistVideos || playlistVideos?.length < playlist?.itemCount)) {
                status = "loading";
                getPlaylistItems(nextPageToken).then(() => { status = "" });
                obs.unobserve(element[0].target);
            }
        },
            {
                rootMargin: "180px"
            });
        observer.observe(document.getElementById("playlistItemsLoder"));
    }, [playlistVideos]);
    return (
        <div
            className={`px-1 py-2 flex gap-4 ${deviceWidth === "lessThenMedium" ? "flex-col" : "flex-row"}`}
        >
            <div className={"p-6 rounded-md flex bg-light_bg_20 dark:bg-dark_bg_800"
                + ` ${deviceWidth === "lessThenMedium" ? "flex-row gap-4" : "flex-col w-[20rem]"}`
            }>
                <img
                    src={playlist?.mediumThumbnail}
                    className={` rounded-md ${deviceWidth === "lessThenMedium" ? "w-[40%] aspect-video" : ""}`}
                    alt="playlistThumbnail"
                />
                <div>
                    <h1 className="mt-2 text-xl font-bold text-light_text_900 dark:text-dark_text_900">
                        {playlist?.title?.slice(0, 60)}
                    </h1>
                    <p className="mt-3 font-medium text-light_text_800 dark:text-dark_text_800">
                        <span>{playlist?.channelTitle}</span>
                    </p>
                    <p className="mt-1 text-[0.84rem] text-light_text_600 dark:text-dark_text_600">{playlist?.itemCount} videos • {howOldTimeHandler(playlist?.publishedAt)}</p>
                    <p className="mt-1 text-[0.76rem] text-light_text_600 dark:text-dark_text_600">{deviceWidth === "lessThenMedium" ?   playlist?.description?.slice(0, 150) : playlist?.description }</p>
                </div>

            </div>
            <div className="flex-1 pt-6 flex flex-col gap-6">
                {playlistVideos?.map(item => (<VideoCart videoId={item} type={"horizontal"} />))}
                <div id="playlistItemsLoder"></div>
            </div>
        </div>
    );
}
export default PlaylistPage;