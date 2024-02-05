import { useEffect } from "react";
import { USER_SUBSCRIPTION } from "../utils/apiConstent";
import { useDispatch, useSelector } from "react-redux";
import { addSubcriptions } from "../store/slices/userInfo";

const useFetchSubscription = () => {

    const dispatch = useDispatch();
    const authenticationStatus = useSelector(store => store.states.isUserAuthenticated);
    useEffect(() => {
        if (authenticationStatus) {
            (async () => {
                try {
                    const res = await fetch(USER_SUBSCRIPTION +
                        `?part=snippet` +
                        `&mine=true` +
                        `&maxResults=50`,
                        {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${JSON.parse(localStorage.getItem('authInfo')).access_token}`,
                            }
                        });

                    const data = await res.json();

                    if (data?.items) {
                        const list = data?.items?.map((item) => item?.snippet?.resourceId?.channelId);
                        dispatch(addSubcriptions(list));
                    }
                }
                catch (err) { }
            }
            )();
        }
    }, [authenticationStatus]);
};
export default useFetchSubscription;