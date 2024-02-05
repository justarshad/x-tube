import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { howOldTimeHandler, countHandler, durationHandler } from "../utils/functions";

const VideoTitle = ({ length, videoId }) => {
    const title = useSelector(store => store?.videos[videoId]?.title);
    return (<>
        {title &&
            (<h2 className={"text-[1rem] font-medium leading-[1.2rem]"
                + " text-light_text_1000 dark:text-dark_text_1000"
            }>
                {title.length > length ? title.slice(0, length - 2) + "..." : title}
            </h2>)}
    </>

    );
}

const VideoViews = ({ videoId }) => {
    const views = useSelector(store => store?.videos[videoId]?.viewCount);
    const time = useSelector(store => store?.videos[videoId]?.publishedAt);

    return (<>
        {views && time &&
            (<p className={"text-[0.78rem] leading-[0.90rem]"
                + " text-light_text_800 dark:text-dark_text_800"
            }
            >
                {`${countHandler(views)} views • ${howOldTimeHandler(time)}`}
            </p>)
        }
    </>
    )
}
const ChannelIcon = ({ channelId, size }) => {
    const url = useSelector(store => store?.channels?.[channelId]?.profileUrl);
    return (<>
        {url &&
            (<img
                src={url}
                className={`rounded-full aspect-square h-full`}
                alt="channelIcon"
            />)
        }
    </>
    )
}
const ChannelTitle = ({ videoId, length }) => {
    const title = useSelector(store => store?.videos[videoId]?.channelTitle);

    return (
        <>
            {title &&
                (<h3 className={"mt-1 text-[0.90rem] font-medium"
                    + " text-light_text_800 dark:text-dark_text_800"}
                >
                    {title?.length < length ? title : title?.slice(0, length - 2) + "..."}
                </h3>)
            }
        </>);
}
const VideoCart = ({ videoId, type }) => {

    const navigate = useNavigate();
    const videoDetails = useSelector(store => store?.videos[videoId]);
    const channelId = videoDetails?.channelId;
    const deviceSize = useSelector(store => store?.states?.deviceSize);
    const thumbnailWidth = (deviceSize === "ph" ? 12 : deviceSize === "sm" ? 16 : deviceSize === "md" ? 20 : 24);
    return (
        <div
            className={type === "horizontal" ? "flex gap-4" : ""}
        >
            <div className="flex items-start ">
                <div
                    onClick={() => navigate(`/watch?v=${videoId}`)}
                    className={`relative cursor-pointer ${type === "horizontal" ? `w-[${thumbnailWidth}rem]` : "w-full "}`}>
                    <img
                        src={videoDetails?.mediumThumbnail}
                        className={`rounded w-full`}
                        alt="thumbnail"
                    />
                    {videoDetails?.duration &&
                        (<span className={"absolute bottom-[4%] right-[2%]"
                            + " text-sm leading-4  font-medium p-[0.24rem] rounded-sm bg-light_bg_200"
                            + " text-light_text_800 dark:text-dark_text_800"
                            + " bg-light_bg_200 dark:bg-dark_bg_10"
                        }>
                            {durationHandler(videoDetails?.duration)}
                        </span>)
                    }
                </div>
            </div>

            {
                type === "horizontal" ?
                    (<>
                        <div className=" flex-1 flex flex-col gap-2">
                            <VideoTitle videoId={videoId} length={deviceSize === "ph" ? 40 : deviceSize === "sm" ? 55 : 80} />
                            <VideoViews videoId={videoId} />
                            <div className="flex gap-1 h-[2rem]">
                                <ChannelIcon channelId={channelId} size={"1rem"} />
                                <ChannelTitle videoId={videoId} length={deviceSize === "ph" ? 20 : deviceSize === "sm" ? 28 : 80} />
                            </div>
                            {deviceSize !== "ph" &&
                                (<p className={"text-[0.78rem] leading-[0.90rem]"
                                    + " text-light_text_800 dark:text-dark_text_800"
                                }
                                >
                                    {videoDetails?.description.length > 120 ?
                                        videoDetails?.description.slice(0, 115) + "..."
                                        :
                                        videoDetails?.description
                                    }
                                </p>)}
                            {deviceSize !== "ph" && deviceSize !== "sm" &&
                                (<h4 className={"text-[0.84rem] font-medium"
                                    + " text-light_text_900 dark:text-dark_text_900"
                                }
                                >
                                    {videoDetails?.definition?.toUpperCase()}
                                </h4>)}

                        </div>
                    </>)
                    :
                    (<>
                        <div className="mt-4 flex gap-2 ">
                            <div className="h-[1.96rem] aspect-square">
                                <ChannelIcon channelId={channelId} />
                            </div>
                            <div>
                                <VideoTitle videoId={videoId} length={50} />
                                <ChannelTitle videoId={videoId} length={-1} />
                                <VideoViews videoId={videoId} />
                            </div>
                        </div>
                    </>)
            }
        </div >
    );
}
export default VideoCart;