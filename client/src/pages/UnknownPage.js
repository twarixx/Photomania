function UnknownPage() {
    return (
        <>
            <div
                className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">
                <h1 className="header">404: Page not found</h1>
                <div className="text-sm text-center">
                    <p>Sorry but we couldn't find the page you were looking for!</p>
                    <p>Perhaps it has been deleted or moved?</p>
                </div>
            </div>
        </>
    );
}

export default UnknownPage;