import React from 'react'
import { useQuery } from 'react-query'
import Card from '@components/Card'
import { useAccount } from "wagmi"
import experimentContractInfo from "@abi/experiment.json"
import { useContractRead, useContractWrite } from 'wagmi'
import axios from 'axios'
import type { Experiment, NftURI } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'

function Experiments() {

    const [selectedExperiment, setSelectedExperiment] = React.useState<Experiment | undefined>(undefined)
    const [selectedImage, setSelectedImage] = React.useState<string | undefined>(undefined)

    const { experiments } = useExperiments()

    return (
        <>
            {experiments?.map((experiment: Experiment, index: number) => (
                <label htmlFor="remix-modal"
                    key={index} onClick={() => {
                        setSelectedExperiment(experiment)
                        setSelectedImage(experiment.image)
                    }}>
                    <Card nft={experiment} />
                </label>
            ))}
        </>
    )
}

export default Experiments