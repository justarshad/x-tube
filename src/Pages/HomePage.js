import VideoCart from "../components/VideoCart";
import { useSelector } from "react-redux";

import useFetchPopularVideos from "../hooks/useFetchPopularVideos";
import { useEffect, useState } from "react";
import useFetchChannels from "../hooks/useFetchChannels";

const HomePage = () => {
    const [channelsList, setChannelsList] = useState([]);
    const getPopularVideos = useFetchPopularVideos();
    useFetchChannels(channelsList);
    const videos = useSelector(store => store.popular);

    useEffect(() => {
        getPopularVideos()
            .then(list => setChannelsList(list));
    }, []);
    return (
        <div className="flex-1">
            <div className={`p-1 grid grid-cols-auto gap-3`}>
                {videos?.map((item) => (<VideoCart key={item} videoId={item} />))}
            </div>
        </div>
    )
}

export default HomePage;