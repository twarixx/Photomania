import {HomeStatistic} from "../../components/admin/HomeStatistic";

function Home() {
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <HomeStatistic/>
                <HomeStatistic/>
                <HomeStatistic/>
                <HomeStatistic/>
            </div>
        </>
    );
}

export default Home;