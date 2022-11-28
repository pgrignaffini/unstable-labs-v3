import { trpc } from '@utils/trpc'
import { useLoggedUser } from '@hooks/useLoggedUser'

export const useLikes = (tokenId: number) => {

    const { user } = useLoggedUser()
    const ctx = trpc.useContext();

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

    return { like, likes, addLikeMutation }
}