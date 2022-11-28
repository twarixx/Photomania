export const HomeStatistic = ({amount, content, image}) => {
    return (
        <div className="bg-white w-full p-4 rounded-lg text-gray-700 flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm">{content}</p>
                <p className="text-black font-semibold pl-1">{amount}</p>
            </div>
            <div>
                <img className="bg-sky-700 rounded-xl p-1.5" src={image} alt="Icon"/>
            </div>
        </div>
    )
}