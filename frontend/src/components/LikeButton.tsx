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
    const { like, likes, addLikeMutation } = useLikes(tokenId)

    useEffect(() => {
        if (likes) {
            setDisplayLikes(likes)
        }
    }, [likes])

    const addLike = () => {
        if (like) return
        else { addLikeMutation.mutate({ tokenId, userId: user?.id as string }) }
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
                    {(like || disabled) ? <img src="heart-filled.png" className="h-4 lg:h-6" /> : <img src="heart.png" className="h-4 lg:h-6" />}
                    <p className='text-[0.5rem] lg:text-sm text-white'>{displayLikes ?? "0"}</p>
                </button>
                :
                <div className='flex items-center space-x-1'>
                    <img src="heart.png" className="h-4 lg:h-6" />
                    <p className='text-[0.5rem] lg:text-sm text-white'>{displayLikes ?? "0"}</p>
                </div>
            }
        </>
    )
}

export default LikeButton