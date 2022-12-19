import { useState, memo } from 'react'
import { useSession } from "next-auth/react";
import { usePapers } from '@hooks/usePapers';
import { useSingleExperiment } from '@hooks/useSingleExperiment';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

type Props = {
    tokenId: number
}

//https://medium.com/@omrisa25/the-reconciliation-mechanism-in-react-how-it-works-and-how-to-optimize-it-with-function-components-9c9f1b234f7f

const NewFile = ({ tokenId }: Props) => {


    const enum TerminalState { welcome, desc, done, error }
    const [terminalState, setTerminalState] = useState<TerminalState>(TerminalState.welcome)
    const [title, setTitle] = useState('')
    const [text, setText] = useState<string>('')
    const { data: session } = useSession();
    const { createPaperMutation } = usePapers()
    const { experiment, isLoadingExperiment } = useSingleExperiment(tokenId)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTerminalState(terminalState + 1)
        if (terminalState === TerminalState.desc) {
            await createPaperMutation.mutateAsync({ title, text, tokenId }, {
                onSuccess: () => {
                    setTerminalState(TerminalState.done)
                },
                onError: () => {
                    setTerminalState(TerminalState.error)
                }
            })
        }
    }

    const [welcome] = useTypewriter({
        words: ['Welcome to the Lab File System!', 'Please enter a title for your file.'],
        loop: 1,
        delaySpeed: 500,
        deleteSpeed: 50,
    })

    return (
        <div className='container flex flex-col space-y-5 bg-black p-6'>
            <div className='flex items-center space-x-10 '>
                <img className="h-24 w-24 object-cover"
                    src={session?.user?.image ?? "https://links.papareact.com/gll"} />
                <p className='h-24 w-full text-acid text-2xl text-center bg-slate-700 p-8 '>{experiment?.style ?? "Collection name"}</p>
            </div>
            <div className='flex items-center space-x-6'>
                <div className='w-96 h-96 flex justify-center items-center'>
                    {isLoadingExperiment ? <img src='/flask.png' className="animate-tremble h-14 w-10" />
                        : <img src={"data:image/.webp;base64," + experiment?.image} alt="collage" className='w-96 h-96 object-contain' />}
                </div>
                <form className="w-96 h-96 border-2 p-4 text-acid" onSubmit={(e) => handleSubmit(e)}>
                    <p>{welcome}</p>
                    <div className="flex items-center">
                        <Cursor cursorColor="#b4e61d" cursorStyle=">" cursorBlinking={false} />
                        <input type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-10 p-2 outline-none bg-transparent" />
                    </div>
                    {terminalState >= TerminalState.desc && (
                        <>
                            <Description />
                            <div className="flex items-center">
                                <Cursor cursorColor="#b4e61d" cursorStyle=">" cursorBlinking={false} />
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full h-10 p-2 outline-none bg-transparent" />
                            </div>
                        </>
                    )}
                    {terminalState === TerminalState.done && (<Done />)}
                    {terminalState === TerminalState.error && (<Error />)}
                    <button type="submit" className="hidden" />
                </form>
            </div>
        </div>

    )
}

const Description = () => {
    const [description] = useTypewriter({
        words: ['Please enter a description for your file.'],
        loop: 1,
        delaySpeed: 500,
        deleteSpeed: 50,
    })

    return (
        <p className="text-acid">{description}</p>
    )
}

const Done = () => {
    const [done] = useTypewriter({
        words: ['File uploaded successfully, you can close this window.'],
        loop: 1,
        delaySpeed: 500,
        deleteSpeed: 50,
    })

    return (
        <p className="text-cyan-600">{done}</p>
    )
}

const Error = () => {
    const [error] = useTypewriter({
        words: ['Something went wrong uploading your file, please try again.'],
        loop: 1,
        delaySpeed: 500,
        deleteSpeed: 50,
    })

    return (
        <p className="text-red-600">{error}</p>
    )
}

export default NewFile