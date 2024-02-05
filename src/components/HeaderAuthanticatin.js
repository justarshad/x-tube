import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import LogOutIcon from "../assets/icons/LogOut";

import useUrlBeautifier from "../hooks/useUrlBeautifier";
import { signIN, signOut } from "../utils/functions";

const HeaderAuthanticatin = () => {
    const [ShowSignOut, setShowSignOut] = useState(false);
    const authenticationStatus = useSelector(store => store.states.isUserAuthenticated);
    const userInfo = useSelector(store => store?.userInfo);

    useUrlBeautifier();
    return (
        <div className=' relative'>
            {!authenticationStatus ?
                (
                    <h2
                        className="text-light_text_1000 font-medium dark:text-dark_text_800"
                        onClick={() => signIN()}>
                        SignIn
                    </h2>
                )
                :
                (
                    <>

                        <img
                            src={userInfo?.picture}
                            className="w-9 rounded-full"
                            alt="userIcon"
                            onClick={() => setShowSignOut(pre => !pre)}
                        />
                        {
                            ShowSignOut &&
                            (<div
                                className={" absolute top-[110%] right-0 p-4 rounded-sm border-[0.10rem]"
                                    + " bg-light_bg_20"
                                    + " dark:bg-dark_bg_600 dark:hover:bg-dark_bg_500"
                                }
                            >
                                <h1 className=" text-xl font-medium">
                                    {userInfo?.name}
                                </h1>
                                <p className="">
                                    {userInfo?.email}
                                </p>
                                <span className="font-medium  mt-3 flex gap-1 p-2 cursor-pointer border-[0.06rem] rounded-md bg-light_bg_50">Your Profile</span>
                                <div
                                    className=" mt-3 flex gap-1 p-2 cursor-pointer border-[0.06rem] rounded-md bg-light_bg_50"
                                    onClick={() => signOut()}
                                >
                                    <LogOutIcon />
                                    <span className="font-medium ">Sign Out</span>

                                </div>
                            </div>)
                        }

                    </>
                )
            }
        </div>
    )
}

export default HeaderAuthanticatin;