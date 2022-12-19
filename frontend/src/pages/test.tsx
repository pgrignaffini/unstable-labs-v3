import React, { useEffect, useState } from 'react'
import { usePapers } from "@hooks/usePapers";
import Paper from '@components/Paper';
import { useSound } from 'use-sound';
import { trpc } from "@utils/trpc";
import PaperSkeleton from '@components/skeletons/PaperSkeleton';
import SearchBook from '@components/SearchBook';

function Test() {


    return (
        <main className="container mx-auto flex min-h-screen items-center justify-evenly lg:justify-center p-4">
        </main>
    )
}

export default Test