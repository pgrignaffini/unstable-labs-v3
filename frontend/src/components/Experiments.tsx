import React from 'react'
import { useQuery } from 'react-query'
import Card from '@components/Card'
import { useAccount } from "wagmi"
import experimentContractInfo from "@abi/experiment.json"
import { useContractRead, useContractWrite } from 'wagmi'
import axios from 'axios'
import type { Experiment, NftURI } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'

type Props = {}

function Experiments({ }: Props) {

    const [selectedExperiment, setSelectedExperiment] = React.useState<Experiment | undefined>(undefined)
    const [selectedImage, setSelectedImage] = React.useState<string | undefined>(undefined)

    const { experiments } = useExperiments()

    return (
        <>
            {experiments?.map((experiment: Experiment, index: number) => (
                <label htmlFor="remix-modal" className='cursor-pointer mt-4'
                    key={index} onClick={() => {
                        setSelectedExperiment(experiment)
                        setSelectedImage(experiment.image)
                    }}>
                    <Card nft={experiment} isVial={false} />
                </label>
            ))}
        </>
    )
}

export default Experiments