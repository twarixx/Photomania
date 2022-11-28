import {HomeStatistic} from "../../components/admin/HomeStatistic";

function Home() {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <HomeStatistic amount={1} content="Users" image="/icons/people.svg"/>
                <HomeStatistic amount={5} content="Posts" image="/icons/posts.svg"/>
                <HomeStatistic amount={32} content="Banned" image="/icons/banned.svg"/>
                <HomeStatistic amount={1} content="Verified" image="icons/verified_users.svg"/>
            </div>
        </>
    );
}

export default Home;