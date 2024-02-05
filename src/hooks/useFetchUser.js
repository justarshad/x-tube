import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/slices/userInfo";
import { updateAuthenticationStatus } from "../store/slices/state";

const useFetchUser = () => {
    const dispatch = useDispatch();
    const authenticationStatus = useSelector(store => store.states.isUserAuthenticated);

    if (localStorage.getItem('authInfo')) {
        dispatch(updateAuthenticationStatus(true));
    } else {
        dispatch(updateAuthenticationStatus(false));
    }

    useEffect(() => {
        if (authenticationStatus) {
            (async () => {
                try {
                    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('authInfo')).access_token}`,
                        }
                    });
                    const data = await res.json();

                    if (data?.error) {
                        dispatch(updateAuthenticationStatus(false));
                        localStorage.removeItem('authInfo');
                    }
                    else {
                        dispatch(addUser(data));
                    }
                }
                catch (err) { }
            })();
        }
    }, [authenticationStatus]);
};

export default useFetchUser;