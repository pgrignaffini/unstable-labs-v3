import React from 'react'
import Link from "next/link"

type Props = {
    hash: string;
    className?: string;
}

function TxHash({ hash, className }: Props) {
    return (
        <div className='flex space-x-4 items-center'>
            <p className={className}>Tx:</p>
            <Link target="_blank"
                href={`https://testnet.aurorascan.dev/tx/${hash}`}
                className={`hover:underline hover:text-blue-600 cursor-pointer ${className}`}>
                {hash?.slice(0, 10) + "..."}
            </Link>
        </div>
    )
}

export default TxHash