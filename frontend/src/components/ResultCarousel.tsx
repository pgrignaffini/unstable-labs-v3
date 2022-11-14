import React, { useState } from 'react'
import MintExperimentButton from "@components/MintExperimentButton"

type Props = {
    images: string[]
}

function ResultCarousel({ images }: Props) {

    const [imageToShow, setImageToShow] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const zoomModal = (
        <>
            <input type="checkbox" id="zoom-modal" className="modal-toggle" />
            <div className="modal">
                <div className="relative">
                    <label htmlFor="zoom-modal" className="absolute right-2 top-2 font-pixel text-2xl text-white cursor-pointer">X</label>
                    <img className='w-full h-full object-cover' src={"data:image/.webp;base64," + imageToShow} alt="banner" />
                </div>
            </div>
        </>
    )

    const resultModal = (
        <>
            <input type="checkbox" id="result-modal" className="modal-toggle" />
            <div className="modal">
                <div className="w-1/2">
                    <label htmlFor="result-modal" className="font-pixel text-2xl text-white cursor-pointer" onClick={() => {
                        setName("")
                        setDescription("")
                        setImageToShow("")
                    }}>X</label>
                    <div className="bg-white bg-opacity-50 backdrop-blur-xl p-8">
                        <div className="flex items-start space-x-10">
                            <img className='w-1/3' src={"data:image/.webp;base64," + imageToShow} alt="image" />
                            <form className="flex flex-1 flex-col space-y-6 ">
                                <input
                                    type="text"
                                    value={name}
                                    className="bg-white bg-opacity-50 backdrop-blur-xl p-2
                                 outline-none font-pixel text-black placeholder:font-pixel text-sm placeholder:text-sm"
                                    placeholder="Enter name..." onChange={(e) => setName(e.target.value)} />
                                <textarea
                                    value={description}
                                    rows={5}
                                    className="bg-white bg-opacity-50 backdrop-blur-xl p-2
                                  outline-none text-black font-pixel placeholder:font-pixel text-sm placeholder:text-sm"
                                    placeholder="Enter description..." onChange={(e) => setDescription(e.target.value)} />
                                <div className="mx-auto">
                                    <MintExperimentButton
                                        metadata={{
                                            image: imageToShow,
                                            name,
                                            description
                                        }} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div>
            {zoomModal}
            {resultModal}
            <div className='bg-gray-400 p-4 overflow-x-auto flex space-x-4'>
                {images?.map((image: string, index: number) => (
                    <div className="flex flex-col space-y-4 items-center " key={index}>
                        <div onClick={() => setImageToShow(image)}>
                            <div className='bg-gray-200 p-4 w-60 h-124 flex-none shadow-xl'>
                                <label htmlFor="zoom-modal" className='cursor-pointer'>
                                    <img src={"data:image/.webp;base64," + image} />
                                </label>
                            </div>
                        </div>
                        <label htmlFor="result-modal" className='cursor-pointer mt-4'>
                            <div className="group flex space-x-2 items-end  w-fit bg-acid py-4 px-10"
                                onClick={() => setImageToShow(image)}>
                                <p className="font-pixel text-md text-white">Brew</p>
                                <div className="group-hover:animate-tremble">
                                    <img src="/flask.png" alt="flask" className="w-6" />
                                </div>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResultCarousel