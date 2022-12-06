import { trpc } from '@utils/trpc'

export const useReviews = (paperId?: number) => {

    const ctx = trpc.useContext();

    const { data: userReviews, isLoading: isLoadingUserReviews } = trpc.review.getUserReviews.useQuery()

    const { data: paperReviews, isLoading: isLoadingPaperReviews } = paperId ? trpc.review.getPaperReviews.useQuery({ paperId }) : { data: null, isLoading: false }

    const { data: numberOfReviews, isLoading: isLoadingPaperReviewCount } = paperId ? trpc.review.getPaperReviewCount.useQuery({ paperId }) : { data: null, isLoading: false }

    const createReviewMutation = trpc.review.createReview.useMutation({
        onMutate: () => {
            ctx.review.getPaperReviews.invalidate()
            ctx.review.getPaperReviewCount.invalidate()
        },
        onSettled: () => {
            ctx.review.getPaperReviews.refetch()
            ctx.review.getPaperReviewCount.refetch()
        }
    })

    return { userReviews, paperReviews, createReviewMutation, isLoadingPaperReviews, isLoadingUserReviews, numberOfReviews, isLoadingPaperReviewCount }
}