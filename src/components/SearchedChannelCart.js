import { useSelector } from "react-redux";
import { countHandler } from "../utils/functions";

const SearchedChannelCart = ({ channelId }) => {
    const channel = useSelector(store => store?.channels[channelId]);
    return (
        <div className="flex  gap-4 my-2">
            <div className="w-[16rem] flex justify-center items-start ">
                <img
                    src={channel?.profileUrl}
                    className="mt-4 rounded-full w-1/2 "
                    alt="Channel Thumbnail"
                />
            </div>

            <div className="flex-1">
                <h2 className="text-[1.6rem] font-medium 
                 text-light_text_1000 dark:text-dark_text_1000">
                    {channel?.title}
                </h2>

                <p className="text-[1rem] pt-[0.05rem]
                 text-light_text_900 dark:text-dark_text_900">
                    {`${channel?.customUrl} • ${countHandler(channel?.subscriberCount)}`}
                </p>

                <p className="pt-[0.8rem] text-sm 
                text-light_text_800 dark:text-dark_text_800">
                    {channel?.description?.length > 200 ? channel?.description?.slice(0, 195) + "..." : channel?.description}
                </p>
            </div>
        </div>
    )
}

export default SearchedChannelCart;