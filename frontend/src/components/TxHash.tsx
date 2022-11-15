import React from 'react'
import Link from "next/link"

type Props = {
    hash: string;
}

function TxHash({ hash }: Props) {
    return (
        <div className='flex space-x-4 items-center'>
            <p className='font-pixel text-[12px] text-gray-700'>Tx:</p>
            <Link target="_blank"
                href={`https://testnet.aurorascan.dev/tx/${hash}`}
                className='text-[12px] hover:underline hover:text-blue-600 cursor-pointer text-black'>
                {hash.slice(0, 25) + "..."}
            </Link>
        </div>
    )
}

export default TxHash