import React from 'react'
import { trpc } from '@utils/trpc'
import { useLoggedUser } from '@hooks/useLoggedUser';
import { BigNumber } from 'ethers';

type Props = {
    tokenId: number;
}

function LikeButton({ tokenId }: Props) {

    const ctx = trpc.useContext();
    const { user } = useLoggedUser()
    const [disabled, setDisabled] = React.useState(false)

    const { data: like } = trpc.experiment.getExperimentLikes.useQuery({ tokenId }, {
        select: (data) => !!data?.likes.find(like => like.userId === user?.id),
    })

    const { data: likes } = trpc.experiment.getExperimentLikes.useQuery({ tokenId }, {
        select: (data) => data?.likes.length
    })

    const addLikeMutation = trpc.like.addLike.useMutation({
        onMutate: () => {
            ctx.experiment.getExperimentLikes.invalidate({ tokenId })
        },
        onSettled: () => {
            ctx.experiment.getExperimentLikes.refetch({ tokenId })
        }
    })

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