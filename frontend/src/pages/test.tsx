import Airdrop from '@components/Airdrop'
import SolidButton from '@components/SolidButton'
import React from 'react'
import { useSession } from 'next-auth/react'
import { trpc } from '@utils/trpc'


function TestPage() {

    const { data: session } = useSession()

    const { data: user } = trpc.user.getUser.useQuery({
        id: session?.user?.id || '1'
    })

    return (
        <div className='container min-h-screen flex justify-center items-center'>
            {user && !user?.hasClaimedVials &&
                <Airdrop />
            }
        </div>
    )
}

export default TestPage