import { useState } from 'react'
import { useLoggedUser } from '@hooks/useLoggedUser';
import { useLikes } from '@hooks/useLikes';

type Props = {
    tokenId: number;
}

function LikeButton({ tokenId }: Props) {

    const { user } = useLoggedUser()
    const [disabled, setDisabled] = useState(false)

    const { like, likes, addLikeMutation } = useLikes(tokenId)

    const addLike = async () => {
        if (like) return
        else {
            addLikeMutation.mutate({ tokenId, userId: user?.id as string })
        }
    }

    return (
        <>
            {
                user &&
                <button className="flex hover:border  space-x-1 items-center p-3 cursor-pointer"
                    disabled={disabled} onClick={() => {
                        setDisabled(true)
                        addLike()
                    }}>
                    {(like || disabled) ? <img src="heart-filled.png" className="h-6" /> : <img src="heart.png" className="h-6" />}
                    <p className='text-sm text-white'>{likes ?? "0"}</p>
                </button>
            }
        </>
    )
}

export default LikeButton