import { useEffect, useState } from 'react'
import { usePaperLikes } from '@hooks/usePaperLikes'
import { useLoggedUser } from '@hooks/useLoggedUser'

type Props = {
    paperId: number;
}

const FileLikeButton = ({ paperId }: Props) => {

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
                        <img src="heart-filled.png" className="h-4 lg:h-6" /> : <img src="heart.png" className="h-4 lg:h-6" />}
                    <p className='md:text-lg text-white'>{displayLikes ?? "0"}</p>
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

export default FileLikeButton