import React from 'react'

const Privacy = () => {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-semibold text-light_text_900 dark:text-dark_text_900">
                This is Privacy Policy for Xtube
            </h1>

            <p className=" mt-6 text-base font-semibold text-light_text_800 dark:text-dark_text_800">
                Xtube is a project to demonstrate devlopers frontend skills. Xtube app dosen't collect or store any kind of user's information. if user wish to sign in on Xtube with google account, then Xtube use user's list of subscribed channels, Xtube can know your liked videos on youtube. Xtube can subscribe a youtube channel, can add a comments if user wish to do this.
            </p>

            <p className=" mt-2 text-base font-semibold text-light_text_800 dark:text-dark_text_800">
                Xtube doesn't store any kind of user information. Xtube use Youtube apis to provides features.
            </p>
        </div>);
}

export default Privacy;