import React from 'react'
import { useContext } from "react";
import AppContext from "@context/AppContext";
import MintExperimentButton from "@components/MintExperimentButton";

function SelectedImages() {

    const { selectedImage, selectedImages, setSelectedImage, setSelectedImages } = useContext(AppContext)

    const removeImage = (index: number) => {
        if (selectedImage === selectedImages?.[index]) setSelectedImage('')
        setSelectedImages(selectedImages?.filter((_, i) => i !== index))
    }

    return (
        <>
            {selectedImages?.length > 0 ?
                <div className='bg-gray-400 p-4 overflow-x-auto flex space-x-4'>
                    {selectedImages?.map((image, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <div className="relative" >
                                <p className='absolute -top-4 left-0 text-2xl text-red-500 cursor-pointer' onClick={() => removeImage(index)}>X</p>
                                <img onClick={() => {
                                    image === selectedImage ? setSelectedImage("") : setSelectedImage(image)
                                }
                                } src={"data:image/.webp;base64," + image} alt="images" className={`h-32 w-32 object-contain cursor-pointer ${selectedImage === image ? "border-4 border-acid" : null}`} />
                            </div>
                            <MintExperimentButton
                                className="p-2 text-[0.8rem] text-white text-center bg-acid cursor-pointer"
                                id={index.toString()} image={image} />
                        </div>
                    ))}
                </div> : null
            }
        </>
    )
}

export default SelectedImages