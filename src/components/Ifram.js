
const Ifram = ({videoId}) => {
    return (
        <iframe
            className="w-[100%] aspect-video"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}>
        </iframe>
    )
}

export default Ifram;