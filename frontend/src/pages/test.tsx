import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import Paper from "@components/Paper";
import type { UIEvent } from "react";

const Test: NextPage = () => {

    const [showLoading, setShowLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [visitedPages, setVisitedPages] = useState<number[]>([1])
    const limit = 10
    const { data: paginatedPapers, fetchNextPage, hasNextPage } = trpc.paper.getPaginatedPapers.useInfiniteQuery({
        limit,
    }, {
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
        },
        getPreviousPageParam: (firstPage) => {
            return firstPage.prevCursor
        },
        onSuccess: () => {
            setShowLoading(false)
        }
    })

    const handleScroll = (e: UIEvent) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target as HTMLDivElement
        if (offsetHeight + scrollTop >= scrollHeight) {
            setShowLoading(true)
            if (!visitedPages.includes(currentPage + 1)) {
                setVisitedPages([...visitedPages, currentPage + 1])
                fetchNextPage()
            }
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <Head>
                <title>UnstableLabs</title>
                <meta name="description" content="" />
                <link rel="icon" href="/flask.png" />
            </Head>
            <main className="container mx-auto min-h-screen flex flex-col space-y-3 items-center justify-center p-4 bg-paper">
                <div className="h-screen w-full overflow-y-scroll scrollbar-hide p-1" onScroll={(e) => handleScroll(e)}>
                    {
                        paginatedPapers?.pages.map((page, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                {page.papers.map((paper, index) => (
                                    <Paper key={index} paper={paper} />
                                ))}
                                {showLoading && hasNextPage && index === paginatedPapers.pages.length - 1 && (
                                    <div className="flex justify-center items-center">
                                        <img src="/flask.png" className="animate-tremble h-10 w-8" />
                                    </div>)}
                                {!hasNextPage && index === paginatedPapers.pages.length - 1 && (
                                    <div className="flex justify-center items-center">
                                        <p className="font-tinos text-center text-xl">No more papers to show</p>
                                    </div>
                                )
                                }
                            </div>
                        ))
                    }
                </div>

            </main>
        </>
    );
};

export default Test;


