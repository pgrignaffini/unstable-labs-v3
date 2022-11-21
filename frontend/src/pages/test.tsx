import Airdrop from '@components/Airdrop'
import SolidButton from '@components/SolidButton'
import React from 'react'
import { useSession } from 'next-auth/react'
import { trpc } from '@utils/trpc'
import { toast } from 'react-hot-toast'
import Toast from '@components/Toast'

function TestPage() {

    const { data: session } = useSession()

    const { data: user } = trpc.user.getUser.useQuery({
        id: session?.user?.id || '1'
    })

    return (
        <div className='container min-h-screen flex justify-center items-center'>
            <SolidButton className='text-white' text="Toast" color='green' onClick={() => {
                toast.custom((t) => <Toast toastInfo={t} message='Hello' />)
            }} />
        </div>
    )
}

export default TestPage