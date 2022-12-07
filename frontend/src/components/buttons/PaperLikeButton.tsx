import { useEffect, useState } from 'react'
import { usePaperLikes } from '@hooks/usePaperLikes'
import { useLoggedUser } from '@hooks/useLoggedUser'

type Props = {
    paperId: number;
}

const PaperLikeButton = ({ paperId }: Props) => {

    const { user } = useLoggedUser()
    const [disabled, setDisabled] = useState(false)
    const [displayLikes, setDisplayLikes] = useState(0)
    const { hasLiked, numOfLikes, addLikeMutation } = usePaperLikes(paperId)

    useEffect(() => {
        if (numOfLikes) {
            setDisplayLikes(numOfLikes)
        }
    }, [numOfLikes])

    const addLike = () => {
        if (hasLiked) return
        else { addLikeMutation.mutate({ paperId }) }
    }

    return (
        <>
            {user ?
                <button className="flex space-x-1 items-center p-3 cursor-pointer"
                    disabled={disabled} onClick={() => {
                        setDisabled(true)
                        if (!hasLiked) setDisplayLikes(displayLikes + 1)
                        addLike()
                    }}>
                    {(hasLiked || disabled) ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-6 h-6 lg:w-8 lg:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6 lg:w-8 lg:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>}
                    <p className='font-tinos md:text-lg text-black'>{displayLikes ?? "0"}</p>
                </button>
                :
                <div className='flex items-center space-x-1'>
                    <img src="heart.png" className="h-4 lg:h-6" />
                    <p className='text-sm text-white'>{displayLikes ?? "0"}</p>
                </div>
            }
        </>
    )
}

export default PaperLikeButton