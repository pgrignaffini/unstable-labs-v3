import { useState } from "react"
import { useQuery } from "react-query"
import { checkProgress, getImages } from "@utils/stableDiffusion"
import type { Request, Progress } from "../types/types"
import { useContext } from "react";
import AppContext from "@context/AppContext";

export const useLoadingImages = () => {

    const { request, setRequest } = useContext(AppContext)
    const [progress, setProgress] = useState<Progress | undefined>(undefined)
    const [error, setError] = useState<Error | undefined>(undefined)

    const { data: progressData } = useQuery("progress", () => checkProgress(request as Request), {
        enabled: !!request && (progress?.state.done === false || progress === undefined),
        refetchInterval: 1000,
        onError: (error: Error) => {
            setError(error)
        },
        onSuccess(data) {
            setProgress(data)
        },
    })

    const { data: images, isLoading: isLoadingImages, isFetching: isFetchingImages } = useQuery("images", () => getImages(request as Request), {
        enabled: !!progress && !!request && progress.state.done,
        onError: (error: Error) => {
            setError(error)
        },
        onSuccess: () => {
            setRequest(undefined)
            setProgress(undefined)
        }
    })

    const isLoading: boolean = isLoadingImages || isFetchingImages || (progress?.state.done === false)

    return { progressData, images, isLoading, error }
}