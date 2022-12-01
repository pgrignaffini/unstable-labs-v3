import { useState } from "react";
import dynamic from "next/dynamic";
import VialShop from "@components/VialShop";
import Vials from "@components/Vials";
import Experiments from "@components/Experiments";
import Discover from "@components/Discover";
import { useAccount } from "wagmi";
import Library from "@components/Library";

const CollectionSideBarRow = dynamic(
    () => import('@components/CollectionSideBarRow'),
    { ssr: false }
)

const Brewery = () => {

    const { isConnected } = useAccount()
    const [selectedTab, setSelectedTab] = useState('shop')

    return (
        <div className="grid grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2 lg:gap-8 p-4 lg:p-10 w-full mx-auto min-h-screen">
            <div className="col-span-4 z-10 bg-black sticky top-2 md:col-span-1">
                {/* sidebar */}
                <div className='flex w-full md:flex-col col-span-1 lg:col-span-2 items-end md:space-y-8 md:w-fit md:items-start border-2 md:border-0 md:border-r-2 md:border-b-2 border-acid'>
                    {isConnected && (
                        <>
                            <CollectionSideBarRow title="Experiments" type='blob' selected={selectedTab === "experiments"} onClick={() => { setSelectedTab('experiments') }} />
                            <CollectionSideBarRow title="Vials" type='vial' selected={selectedTab === "vials"} onClick={() => { setSelectedTab('vials') }} />
                        </>
                    )}
                    <CollectionSideBarRow title="Vial Shop" type='shop' selected={selectedTab === "shop"} onClick={() => { setSelectedTab('shop') }} />
                    <CollectionSideBarRow title="Discover" type='microscope' selected={selectedTab === "discover"} onClick={() => { setSelectedTab('discover') }} />
                    <CollectionSideBarRow title="Library" underWork type='microscope' selected={selectedTab === "library"} onClick={() => { setSelectedTab('library') }} />
                </div>
            </div>
            <div className="col-span-4 md:col-span-3 lg:col-span-4 2xl:col-span-5 grid auto-rows-auto gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                {selectedTab === 'experiments' && <Experiments />}
                {selectedTab === 'vials' && <Vials />}
                {selectedTab === 'shop' && <VialShop />}
                {selectedTab === 'discover' && <Discover />}
                {selectedTab === 'library' && <Library />}
            </div>
        </div>
    );
}

export default Brewery

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