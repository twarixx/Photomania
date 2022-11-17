const Notification = ({ title, message, userLink }) => {
    return (
        <div className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
            <a className="ml-2" href={userLink}>
                <p className="text-sm font-medium text-gray-900">
                    {title}
                </p>
                <p className="text-sm text-gray-500">
                    {message}
                </p>
            </a>
        </div>
    )
}

export default Notification;