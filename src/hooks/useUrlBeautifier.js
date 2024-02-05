import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAuthenticationStatus } from "../store/slices/state";

const useUrlBeautifier = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const url = window.location.href

        if (url.includes("access_token")) {
            const param = {};
            url.split('&').map((item => {
                const list = item.split('=');
                if (list[0] === "access_token" || list[0] === "token_type" || list[0] === "expires_in" || list[0] === "scope") {
                    param[decodeURIComponent(list[0])] = decodeURIComponent(list[1]);
                }
            }));

            if (Object.keys(param).length > 0) {
                localStorage.setItem('authInfo', JSON.stringify(param));
            }
            window.history.pushState({}, document.title, "/");

            dispatch(updateAuthenticationStatus(true))
        }
    }, []);
}

export default useUrlBeautifier;