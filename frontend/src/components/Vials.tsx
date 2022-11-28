import type { Vial } from "../types/types"
import { groupBy } from '@utils/helpers'
import { useVials } from "@hooks/useVials"
import VialCard from '@components/VialCard'


function Vials() {

    const { vials, isFetchingVialsData, isLoadingVialsData } = useVials()
    const groupedVials = vials ? groupBy(vials, 'style') : []
    const isLoading = isFetchingVialsData || isLoadingVialsData

    return (
        <>
            {isLoading ?
                <div className='flex justify-center items-center'>
                    <img src='/flask-animated.gif' className='w-12' />
                </div> :
                Object.keys(groupedVials).map((key, index) => {
                    const vials: Vial[] = groupedVials[key]
                    return (
                        vials?.length > 0 &&
                        <VialCard key={index} name={vials[0]?.name as string}
                            vial={vials[0] as Vial} multiple={vials.length} info />
                    )
                })}
            {!isLoading && vials?.length === 0 && <p>No vials found</p>}
        </>
    )
}

export default Vials