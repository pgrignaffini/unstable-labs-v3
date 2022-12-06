import { useState, memo } from 'react'
import { useSession } from "next-auth/react";
import { usePapers } from '@hooks/usePapers';
import toast from "react-hot-toast"
import SolidButton from '@components/SolidButton';
import { useSingleExperiment } from '@hooks/useSingleExperiment';
import Toast from '@components/Toast';

type Props = {
    tokenId: number
}

//https://medium.com/@omrisa25/the-reconciliation-mechanism-in-react-how-it-works-and-how-to-optimize-it-with-function-components-9c9f1b234f7f

const NewFile = ({ tokenId }: Props) => {

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
        <div className='container flex flex-col space-y-5 bg-black p-6'>
            <div className='flex items-center space-x-10 '>
                <img className="h-24 w-24 object-cover"
                    src={session?.user?.image ?? "https://links.papareact.com/gll"} />
                <div className='h-24 flex-1 flex justify-center items-center'>
                    <p className='text-cyan-500 text-2xl text-center'>{experiment?.style ?? "Collection name"}</p>
                </div>
            </div>
            <form className="flex flex-1 flex-col space-y-4" onSubmit={handleSubmit}>
                <div className='flex items-center space-x-6'>
                    <p>{">"}</p>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" placeholder="Insert file name here..."
                        className="p-2 flex-1 text-cyan-500  placeholder:text-md bg-transparent text-md outline-none border-b-2 border-dashed " required />
                </div>
                <div className='flex iems-center space-x-6'>
                    {isLoadingExperiment ?
                        <div className='w-96 h-96 flex justify-center items-center'>
                            <img src='/flask.png' className="animate-tremble h-14 w-10" />
                        </div>
                        : <img src={"data:image/.webp;base64," + experiment?.image} alt="collage" className='w-96 h-96 object-contain' />}
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="> Insert file description here..."
                        className="p-2 flex-1 text-sm placeholder:text-sm outline-none text-cyan-500  bg-black" required />
                </div>
                <div className="place-self-end">
                    <button type="submit" className="p-2 border-2 border-cyan-500 border-dashed">Save</button>
                </div>
            </form>
        </div>

    )
}

export default NewFile