import { useState } from "react"
import TimeAgo from 'react-timeago'
import toast from "react-hot-toast"
import { useSession } from "next-auth/react";
import { useReviews } from "@hooks/useReviews";
import Toast from "@components/Toast";

type Props = {
    paperId: number
}

function Reviews({ paperId }: Props) {

    const { data: session } = useSession()
    const { paperReviews, isLoadingPaperReviews, createReviewMutation, numberOfReviews } = useReviews(paperId)
    const [review, setReview] = useState("")
    const [showReviews, setShowReviews] = useState(false)

    const sendReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast.custom((t) => <Toast toastInfo={t} message={"Publishing your review..."} loading />, {
            id: "review-toast",
        })
        createReviewMutation.mutate({
            paperId: paperId,
            text: review,
        }, {
            onSuccess: () => {
                toast.custom((t) => <Toast toastInfo={t} message={"Review published!"} success />, {
                    id: "review-toast",
                })
            },
            onError: () => {
                toast.custom((t) => <Toast toastInfo={t} message={"Error publishing review"} error />, {
                    id: "review-toast",
                })
            }
        })
        setReview("")
    }

    return (
        <div className="bg-slate-100 font-tinos w-full p-5 border overflow-x-hidden">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-xl font-bold text-gray-400 hover:underline cursor-pointer" onClick={() => setShowReviews(!showReviews)}>Reviews ({numberOfReviews ?? 0})</h3>
            </div>
            <div className="h-56 overflow-y-scroll scrollbar-hide scrollbar-thumb-black scrollbar-thin">
                {isLoadingPaperReviews ?
                    <p className="font-tinos text-center text-md">Loading reviews...</p>
                    : paperReviews?.length ? paperReviews?.map(review => (
                        <div key={review?.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7" src={review?.user?.image as string} />
                            <p className="text-md flex-1">
                                <span className="font-bold text-slate-700">{review?.user?.name}</span>
                                {": "}{review?.text}
                            </p>
                            <div className="flex items-center space-x-2">
                                <TimeAgo className="text-sm px-4" date={review?.createdAt} />
                            </div>
                        </div>
                    )) : <p className="font-tinos text-center text-md">Be the first to post a review!</p>}
            </div>
            {session ?
                <form className="flex items-center p-4 border-t" onSubmit={sendReview}>
                    <input
                        type="text"
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        placeholder="Add a review..."
                        className="border-none bg-transparent text-black flex-1 focus:ring-0 outline-none"
                    />
                    <button type="submit" disabled={!review.trim()} className="font-semibold text-primary hover:text-primary-focus cursor-pointer">Review</button>
                </form>
                :
                <h1 className="p-3 font-poppins text-md">You need to sign in to submit a review!</h1>
            }
        </div>
    )
}

export default Reviews