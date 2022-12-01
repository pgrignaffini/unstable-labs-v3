import React from 'react'
import { usePapers } from "@hooks/usePapers";
import Paper from '@components/Paper';

type Props = {}

function Library({ }: Props) {

    const { allPapers } = usePapers()

    return (
        <div className="col-start-2 col-end-5 h-screen overflow-y-scroll space-y-5">
            {allPapers?.map(paper => (
                <Paper paper={paper} key={paper.id} />
            ))}
        </div>
    )
}

export default Library