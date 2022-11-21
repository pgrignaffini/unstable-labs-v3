import Airdrop from '@components/Airdrop'
import SolidButton from '@components/SolidButton'
import React from 'react'
import { useSession } from 'next-auth/react'
import { trpc } from '@utils/trpc'
import { toast } from 'react-hot-toast'


function TestPage() {

    const { data: session } = useSession()

    const { data: user } = trpc.user.getUser.useQuery({
        id: session?.user?.id || '1'
    })

    return (
        <div className='container min-h-screen flex justify-center items-center'>
            <SolidButton text="Toast" color='green' onClick={() => {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full bg-black border pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-center">
                                <img
                                    className="h-10"
                                    src="/flask-animated.gif"
                                />
                                <div className="ml-3 flex-1">
                                    <p className='text-sm text-std'>I am a toast</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent p-4 flex items-center justify-center text-sm font-medium text-acid"
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))
            }} />
        </div>
    )
}

export default TestPage