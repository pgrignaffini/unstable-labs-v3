import React from 'react'
import { useAccount } from 'wagmi'
import { Dispatch, SetStateAction } from 'react'
import dynamic from 'next/dynamic'

const CollectionSideBarRow = dynamic(
    () => import('@components/CollectionSideBarRow'),
    { ssr: false }
)

type Props = {
    setSelectedTab: Dispatch<SetStateAction<string>>
}

function CollectionSidebar({ setSelectedTab }: Props) {

    const { isConnected } = useAccount()
    const [tab, setTab] = React.useState('brewery')

    return (
        <div className='flex flex-col col-span-2 items-center space-y-8 w-fit md:items-start border-r-2 border-b-2 border-acid'>
            {/* <CollectionSideBarRow title="Trending" type='rocket' onClick={() => setSelectedTab('trending')} />
            <CollectionSideBarRow title="Favorites" type='star' onClick={() => setSelectedTab('favorites')} /> */}
            {isConnected && (
                <>
                    <CollectionSideBarRow title="Experiments" type='blob' selected={tab === "experiments"} onClick={() => { setSelectedTab('experiments'); setTab('experiments') }} />
                    <CollectionSideBarRow title="Vials" type='vial' selected={tab === "vials"} onClick={() => { setSelectedTab('vials'); setTab('vials') }} />
                </>
            )}
            <CollectionSideBarRow title="Brewery" type='brewery' selected={tab === "brewery"} onClick={() => { setSelectedTab('vial-brewery'); setTab('brewery') }} />
            <CollectionSideBarRow title="Discover" type='microscope' selected={tab === "discover"} onClick={() => { setSelectedTab('discover'); setTab('discover') }} />
            {/* <CollectionSideBarRow title="Marketplace" type='star' onClick={() => setSelectedTab('marketplace')} /> */}
        </div>
    )
}

export default CollectionSidebar