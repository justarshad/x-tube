import React, { useEffect, useState } from "react";
import useFetchPopularVideos from "../hooks/useFetchPopularVideos";
import { useSelector } from "react-redux";
import VideoCart from "../components/VideoCart";
import useFetchChannels from "../hooks/useFetchChannels";

const TrendingPage = () => {
    const getPopularVideos = useFetchPopularVideos();
    const videos = useSelector(store => store.popular);
    const [channelsList, setChannelsList] = useState([]);

    useFetchChannels(channelsList);
    useEffect(() => {
        getPopularVideos()
            .then(list => setChannelsList(list));

    }, []);
    return (
        <div className="p-2 flex flex-col gap-4">
            <h1 className="text-[1.6rem] font-bold text-light_text_1000 dark:text-dark_text_1000">Trending </h1>
            {videos?.map(item => (<VideoCart videoId={item} key={item} type={"horizontal"} />))}
        </div>
    )
}

export default TrendingPage;