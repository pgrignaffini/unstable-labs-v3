import { trpc } from '@utils/trpc'

export const usePapers = (pageSize?: number, pageNumber?: number) => {

    const ctx = trpc.useContext();

    const { data: userPapers, isLoading: isLoadingUserPapers } = trpc.paper.getUserPapers.useQuery()

    const { data: allPapers, isLoading: isLoadingAllPapers } = trpc.paper.getAllPapers.useQuery()

    const { data: numberOfPapers, isLoading: isLoadingNumberOfPapers } = trpc.paper.getNumberOfPapers.useQuery()

    const createPaperMutation = trpc.paper.createPaper.useMutation({
        onMutate: () => {
            ctx.paper.getUserPapers.invalidate()
        },
        onSettled: () => {
            ctx.paper.getUserPapers.refetch()
        }
    })

    return { userPapers, allPapers, createPaperMutation, isLoadingAllPapers, isLoadingUserPapers, numberOfPapers, isLoadingNumberOfPapers }
}