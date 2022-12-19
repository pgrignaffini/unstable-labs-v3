import { useState } from 'react'
import { useSession } from "next-auth/react";
import { usePapers } from '@hooks/usePapers';
import toast from "react-hot-toast"
import SolidButton from '@components/SolidButton';
import { useSingleExperiment } from '@hooks/useSingleExperiment';
import Toast from '@components/Toast';

type Props = {
    tokenId: number
}

function NewPaper({ tokenId }: Props) {

    const [title, setTitle] = useState('')
    const [text, setText] = useState<string>('')
    const { data: session } = useSession();
    const { createPaperMutation } = usePapers()
    const { experiment, isLoadingExperiment } = useSingleExperiment(tokenId)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toast.custom((t) => <Toast toastInfo={t} message={"Publishing your paper..."} loading />, {
            id: "publish-toast",
        })
        createPaperMutation.mutate({ title, text, tokenId }, {
            onSuccess: () => {
                toast.custom((t) => <Toast toastInfo={t} message={"Paper published!"} success />, {
                    id: "publish-toast",
                })
                setText('')
                setTitle('')
            },
            onError: () => {
                toast.custom((t) => <Toast toastInfo={t} message={"Error publishing paper...please try again"} error />, {
                    id: "publish-toast",
                })
                setText('')
                setTitle('')
            }
        })
    }

    return (
        <div className='container flex flex-col space-y-5 bg-paper p-6'>
            <div className='flex items-center space-x-10 '>
                <img className="h-24 w-24 object-cover"
                    src={session?.user?.image ?? "https://links.papareact.com/gll"} />
                <div className='h-24 flex-1 flex justify-center items-center bg-[#665053]'>
                    <p className='font-tinos text-black text-5xl text-center'>{experiment?.style ?? "Collection name"}</p>
                </div>
            </div>
            <div className='w-full bg-black h-1' />
            <form className="flex flex-1 flex-col space-y-4" onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" placeholder="Paper title..."
                    className="p-2 font-tinos italic bg-transparent text-4xl outline-none border-b-2 border-black text-center text-black" required />
                <div className='flex items-center space-x-6'>
                    {isLoadingExperiment ?
                        <div className='w-96 h-96 flex justify-center items-center'>
                            <img src='/flask.png' className="animate-tremble h-14 w-10" />
                        </div>
                        : <img src={"data:image/.webp;base64," + experiment?.image} alt="collage" className='w-96 h-96 object-contain' />}
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Research description..."
                        className="p-2 h-96 flex-1 font-tinos italic bg-slate-100 text-xl outline-none text-black" required />
                </div>
                <div className="place-self-end">
                    <SolidButton type="submit" color='green' text='Publish' className='text-white' />
                </div>
            </form>
        </div>

    )
}

export default NewPaper