import { trpc } from '@utils/trpc'

export const usePaperLikes = (paperId: number) => {

    const ctx = trpc.useContext();

    const { data: numOfLikes } = trpc.like.getPaperLikesCount.useQuery({ paperId })

    const { data: hasLiked } = trpc.like.getUserPaperLikes.useQuery({ paperId })

    const addLikeMutation = trpc.like.addPaperLike.useMutation({
        onMutate: () => {
            ctx.like.getPaperLikesCount.invalidate({ paperId })
            ctx.like.getUserPaperLikes.invalidate({ paperId })
        },
        onSettled: () => {
            ctx.like.getPaperLikesCount.refetch({ paperId })
            ctx.like.getUserPaperLikes.refetch({ paperId })
        }
    })

    return { hasLiked, numOfLikes, addLikeMutation }
}