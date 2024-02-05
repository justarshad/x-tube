import { useSelector } from "react-redux";
import useAddSubscription from "../hooks/useAddSubscription";

const SubscribeButton = ({ channelId }) => {

    const subscribe = useAddSubscription();
    const isSubscribed = useSelector(store => store.userInfo.subscriptionsList.includes(channelId));
    const isUserAuthenticated = useSelector(store => store.states.isUserAuthenticated);

    return (
        <h1
            className={`px-6 py-2 mt-4 w-fit rounded-full text-dark_text_1000 font-medium ${isSubscribed ? "bg-dark_bg_100" : "bg-red-600"} ${isUserAuthenticated ? "cursor-pointer" : "cursor-not-allowed"}`}
            onClick={() => isUserAuthenticated ? subscribe(channelId) : ""}
        >
            {isSubscribed ? "Subscribed" : "Subscibe"}
        </h1>
    );
}

export default SubscribeButton;