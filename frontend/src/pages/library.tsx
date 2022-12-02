import React from 'react'
import { usePapers } from "@hooks/usePapers";
import Paper from '@components/Paper';


function Library() {

    const { allPapers } = usePapers()

    return (
        <div className="mt-24 w-1/2 mx-auto min-h-screen">
            {allPapers?.map(paper => (
                <div key={paper.id} className="w-full">
                    <Paper paper={paper} />
                </div>
            ))}
        </div>)
}

export default Library