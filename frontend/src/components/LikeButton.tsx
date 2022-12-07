import { useState, useEffect } from 'react'
import { useLoggedUser } from '@hooks/useLoggedUser';
import { useLikes } from '@hooks/useLikes';

type Props = {
    tokenId: number;
}

function LikeButton({ tokenId }: Props) {

    const { user } = useLoggedUser()
    const [disabled, setDisabled] = useState(false)
    const [displayLikes, setDisplayLikes] = useState(0)
    const { hasLiked, numOfLikes, addLikeMutation } = useLikes(tokenId)

    useEffect(() => {
        if (numOfLikes) {
            setDisplayLikes(numOfLikes)
        }
    }, [numOfLikes])

    const addLike = () => {
        if (hasLiked) return
        else { addLikeMutation.mutate({ tokenId }) }
    }

    return (
        <>
            {user ?
                <button className="flex hover:border space-x-1 items-center p-3 cursor-pointer"
                    disabled={disabled} onClick={() => {
                        setDisabled(true)
                        setDisplayLikes(displayLikes + 1)
                        addLike()
                    }}>
                    {(hasLiked || disabled) ? <img src="heart-filled.png" className="h-4 lg:h-6" /> : <img src="heart.png" className="h-4 lg:h-6" />}
                    <p className='text-[0.5rem] lg:text-sm text-white'>{displayLikes ?? "0"}</p>
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

export default LikeButton