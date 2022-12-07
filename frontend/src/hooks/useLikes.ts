import { trpc } from '@utils/trpc'
import { useLoggedUser } from '@hooks/useLoggedUser'

export const useLikes = (tokenId: number) => {

    const ctx = trpc.useContext();

    const { data: numOfLikes } = trpc.like.getExperimentLikesCount.useQuery({ tokenId })

    const { data: hasLiked } = trpc.like.getUserExperimentLikes.useQuery({ tokenId })

    const addLikeMutation = trpc.like.addLike.useMutation({
        onMutate: () => {
            ctx.like.getExperimentLikesCount.invalidate({ tokenId })
            ctx.like.getUserExperimentLikes.invalidate({ tokenId })
        },
        onSettled: () => {
            ctx.like.getExperimentLikesCount.refetch({ tokenId })
            ctx.like.getUserExperimentLikes.refetch({ tokenId })
        }
    })

    return { hasLiked, numOfLikes, addLikeMutation }
}