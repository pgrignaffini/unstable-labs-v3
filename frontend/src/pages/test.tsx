import { type NextPage } from "next";
import Head from "next/head";
import { useLoadingImages } from "@hooks/useLoadingImages";
import { useEffect, useState } from "react";
import { usePapers } from "@hooks/usePapers";
import { useSingleExperiment } from "@hooks/useSingleExperiment";
import { trpc } from "@utils/trpc";
import PaperSkeleton from "@components/skeletons/PaperSkeleton";
import VialCardSkeleton from "@components/skeletons/VialCardSkeleton";
import ExperimentCardSkeleton from "@components/skeletons/ExperimentCardSkeleton";
import { toast } from 'react-hot-toast'
import Toast from '@components/Toast'

const Test: NextPage = () => {

    const { images } = useLoadingImages()
    const { numberOfPapers } = usePapers()
    const [clicked, setClicked] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { experiment } = useSingleExperiment(1)


    useEffect(() => {
        if (clicked) {
            setTimeout(() => {
                setClicked(false)
            }, 500)
        }
    }, [clicked])

    const handleClick = () => {
        toast.custom((t) => <Toast toastInfo={t} message={"Toast"} loading />, {
            id: "review-toast",
        })
        setTimeout(() => {
            toast.custom((t) => <Toast toastInfo={t} message={"Toast"} error />, {
                id: "review-toast",
            })
        }, 2000)
    }

    return (
        <>
            <Head>
                <title>UnstableLabs</title>
                <meta name="description" content="" />
                <link rel="icon" href="/flask.png" />
            </Head>
            <main className="container mx-auto min-h-screen flex flex-col space-y-3 items-center justify-center p-4">
                <button className="p-2 bg-acid" onClick={() => handleClick()}>
                    Toast
                </button>

            </main>
        </>
    );
};

export default Test;


