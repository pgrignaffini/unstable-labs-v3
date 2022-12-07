import { trpc } from '@utils/trpc'

export const useExperimentLikes = (tokenId: number) => {

    const ctx = trpc.useContext();

    const { data: numOfLikes } = trpc.like.getExperimentLikesCount.useQuery({ tokenId })

    const { data: hasLiked } = trpc.like.getUserExperimentLikes.useQuery({ tokenId })

    const addLikeMutation = trpc.like.addExperimentLike.useMutation({
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