export const howOldTimeHandler = (time) => {
    const seconds = (new Date().getTime() - new Date(time).getTime()) / 1000;

    if (seconds < 60) {
        return `${seconds} sec ago`;
    }
    else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)} min ago`;
    }
    else if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)} hour ago`;
    }
    else if (seconds < 2592000) {
        return `${Math.floor(seconds / 86400)} days ago`;
    }
    else if (seconds < 31104000) {
        return `${Math.floor(seconds / 2592000)} months ago`;
    }
    else {
        return `${Math.floor(seconds / 31104000)} years ago`;
    }
};

export const countHandler = (count) => {

    if (count < 1000) {
        return `${count}`;
    }
    if (count < 10000) {
        return `${count % 1000 >= 100 ? (count / 1000).toFixed(1) : Math.floor(count / 1000)}K`;
    }
    if (count < 1000000) {
        return `${Math.floor(count / 1000)}K`;
    }
    if (count < 10000000) {

        return `${count % 1000000 >= 100000 ? (count / 1000000).toFixed(1) : Math.floor(count / 1000000)}M`;
    }
    if (count < 1000000000) {
        return `${Math.floor(count / 1000000)}M`;
    }
    if (count < 10000000000) {
        return `${count % 1000000000 >= 100000000 ? (count / 1000000000).toFixed(1) : Math.floor(count / 1000000000)}B`;
    }
    return `${Math.floor(count / 1000000000)}B`;
}

export const durationHandler = (duration) => {

    let x = '';
    Array.from(duration).forEach((item) => {

        if (item >= "0" && item <= "9") {
            x += item;
        }
        if (item === "H" || item === "M") {
            x += ":";
        }

    });

    const ans = x.split(":").map(item => { return +item < 10 ? "0" + item : "" + item }).join(':');
    return ans.length > 2 ? ans : "00:" + ans;
}

export const signIN = () => {
    const oauthEndPoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const form = document.createElement("form");
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauthEndPoint);

    let param = {
        client_id: "587195281935-sbrhnmagscimav543cfn09j41plkfiq9.apps.googleusercontent.com",
        redirect_uri: "https://x-tube.netlify.app/",
        response_type: "token",
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
        include_granted_scopes: "true",
        state: "pass-through-value"
    }

    for (let v in param) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', v);
        input.setAttribute('value', param[v]);
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
}

export const signOut = () => {
    const token = JSON.parse(localStorage.getItem('authInfo')).access_token;
    fetch("https://oauth2.googleapis.com/revoke?token=" + token,
        {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
        .then((data) => {
            window.location.href = "https://x-tube.netlify.app/";
        });
}

export const screenTypeHandler = (size) => {

    if (size >= 1536) {
        return "2xl";
    }
    else if (size >= 1280) {
        return "xl";
    }
    else if (size >= 1024) {
        return "lg";
    }
    else if (size >= 768) {
        return "md";
    }
    else if (size >= 640) {
        return "sm";
    }
    else return "ph";
}