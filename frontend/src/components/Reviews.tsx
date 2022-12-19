import { useState } from "react"
import TimeAgo from 'react-timeago'
import toast from "react-hot-toast"
import { useSession } from "next-auth/react";
import { useReviews } from "@hooks/useReviews";
import Toast from "@components/Toast";
import Modal from "./Modal";
import PaperModal from "./PaperModal";

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

    const reviewModal = (
        <PaperModal isVisible={showReviews} onClose={() => setShowReviews(false)}>
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
        </PaperModal>
    )

    return (
        <>
            {reviewModal}
            <div className="flex items-center space-x-2">
                <button onClick={() => setShowReviews(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 lg:w-8 lg:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                </button>
                <p className="font-tinos text-black">{numberOfReviews ?? 0}</p>
            </div>
        </>
    )
}

export default Reviews