
const SidebarCart = ({ Icon, text, click, url, Component }) => {
    const textClassesWithUrl = "text-[0.9rem] font-medium";
    return (
        <div
            className={`flex ${url ? "gap-3" : "gap-1"} items-center ${url ? "py-2" : "py-1"} px-2 ${click ? "cursor-pointer" : ""} rounded-md`
                + " text-light_text_1000 dark:text-dark_text_1000 "
                + ` ${click ? "hover:bg-light_bg_50 dark:hover:bg-dark_bg_600" : ""}`
            }
            onClick={() => click ? click() : ""}
        >
            {Component ? (<Component />) : (
                <>
                    {
                        Icon && (<Icon />)
                    }
                    {
                        url && (<img
                            src={url}
                            className="w-6 rounded-full"
                            alt="icon"
                        />)
                    }
                    {
                        text && (<span className={url ? textClassesWithUrl : " text-lg"}>{text}</span>)
                    }
                </>
            )}
        </div>)
}
export default SidebarCart;