import { ADD_COMMENT_REPLY } from "../utils/apiConstent";

const useAddCommentReply = () => {

    return async (parentId, commentText) => {
        try {

            const res = await fetch(ADD_COMMENT_REPLY + `?part=snippet`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('authInfo')).access_token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    snippet: {
                        parentId,
                        textOriginal: commentText,
                    }
                })
            });
            return 'done';
        }
        catch (err) { }
    }
};

export default useAddCommentReply;