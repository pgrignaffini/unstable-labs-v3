import type { NextPage } from "next";
import { useState } from "react";
// import Vials from "../components/Vials";
import dynamic from "next/dynamic";
import VialBrewery from "@components/VialBrewery";
import Vials from "@components/Vials";
import axios from "axios";
import { Style } from "../types/types";

const CollectionSidebar = dynamic(
    () => import('@components/CollectionSidebar'),
    { ssr: false }
)

// const YourNfts = dynamic(
//     () => import('../components/YourNfts'),
//     { ssr: false }
// )

type Props = {
    styles: Style[]
}

const Collections = ({ styles }: Props) => {

    const [selectedTab, setSelectedTab] = useState('your-nfts')

    return (
        <div className="grid grid-cols-3 gap-8 p-10 w-4/5 mx-auto min-h-screen">
            <div className="col-span-1">
                <CollectionSidebar setSelectedTab={setSelectedTab} />
            </div>
            {/* {selectedTab === 'trending' && <Trending />} */}
            {/* {selectedTab === 'your-nfts' && <YourNfts />} */}
            {selectedTab === 'vials' && <Vials />}
            {selectedTab === 'vial-brewery' && <VialBrewery styles={styles} />}
            {/* {selectedTab === 'marketplace' && <AvailableNftsOnMarket />} */}
        </div>
    );
}

export default Collections

// get styles from server side and pass to client
export async function getServerSideProps() {
    const styles = await axios.get(`${process.env.API_BASE_URL}/sdapi/v1/prompt-styles`)
        .catch((err) => {
            console.log(err)
        })
    return {
        props: {
            styles: styles?.data,
        }
    }
}