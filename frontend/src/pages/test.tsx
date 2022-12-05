import { type NextPage } from "next";
import Head from "next/head";
import { useLoadingImages } from "@hooks/useLoadingImages";
import { useEffect, useState } from "react";
import { usePapers } from "@hooks/usePapers";
import { useSingleExperiment } from "@hooks/useSingleExperiment";
import { trpc } from "@utils/trpc";

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

    return (
        <>
            <Head>
                <title>UnstableLabs</title>
                <meta name="description" content="" />
                <link rel="icon" href="/flask.png" />
            </Head>
            <main className="container mx-auto min-h-screen flex flex-col space-y-3 items-center justify-center p-4">

            </main>
        </>
    );
};

export default Test;


