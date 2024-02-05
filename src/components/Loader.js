import React from 'react'

const Loader = () => {

    return (
        <div
            className="flex items-center justify-center h-[6rem]"
        >
            <div
                className="h-[5rem] w-[5rem] flex items-center justify-center rounded-full animate-spin border"
                style={{
                    background: "conic-gradient(#fff 0deg, #fff 300deg, #000 302deg, #000 360deg)"
                }}
            >
                <div className="h-[4rem] w-[4rem] rounded-full bg-white border"></div>
            </div>
        </div >
    );
}
export default Loader;