import Posts from "../components/Posts";

function HomePage() {
    return (
        <>
            {/*<div*/}
            {/*    className="rounded-none relative sm:rounded-md mx-[3px] px-4 py-5 w-full bg-white h-auto text-black z-20">*/}
            {/*    <div>*/}
            {/*        <h1 className="header">Feed</h1>*/}
            {/*        <p className="text-sm text-center">Here are the most recent posts by the people you follow.</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Posts />
        </>
    );
}

export default HomePage;