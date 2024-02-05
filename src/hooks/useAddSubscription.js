import { useDispatch } from "react-redux";
import { addSubcriptions } from "../store/slices/userInfo";

const useAddSubscription = () => {
    const dispatch = useDispatch();

    return async (channelId) => {

        try {
            const res = await fetch("https://www.googleapis.com/youtube/v3/subscriptions?part=snippet", {
                method: 'POST',
                body: JSON.stringify({ snippet: { resourceId: { channelId: channelId } } }),
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('authInfo')).access_token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            dispatch(addSubcriptions([channelId]));
        }
        catch (err) { }
    }
}
export default useAddSubscription;