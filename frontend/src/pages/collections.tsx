import { useState } from "react";
import dynamic from "next/dynamic";
import VialBrewery from "@components/VialBrewery";
import Vials from "@components/Vials";
import Experiments from "@components/Experiments";
import Discover from "@components/Discover";

const CollectionSidebar = dynamic(
    () => import('@components/CollectionSidebar'),
    { ssr: false }
)

const Collections = () => {

    const [selectedTab, setSelectedTab] = useState('vial-brewery')

    return (
        <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8 p-10 w-full mx-auto min-h-screen">
            <div className="col-span-1">
                <CollectionSidebar setSelectedTab={setSelectedTab} />
            </div>
            <div className="col-span-2 lg:col-span-3 2xl:col-span-5 grid auto-rows-auto gap-8 grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5">
                {/* {selectedTab === 'trending' && <Trending />} */}
                {selectedTab === 'experiments' && <Experiments />}
                {selectedTab === 'vials' && <Vials />}
                {selectedTab === 'vial-brewery' && <VialBrewery />}
                {selectedTab === 'discover' && <Discover />}
                {/* {selectedTab === 'marketplace' && <AvailableNftsOnMarket />} */}
            </div>
        </div>
    );
}

export default Collections

// get styles from server side and pass to client
// export async function getServerSideProps() {
//     const styles = await axios.get(`${process.env.API_BASE_URL}/sdapi/v1/prompt-styles`)
//         .catch((err) => {
//             console.log(err)
//         })
//     return {
//         props: {
//             styles: styles?.data,
//         }
//     }
// }