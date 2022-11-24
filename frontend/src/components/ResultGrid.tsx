import MintExperimentButton from "@components/MintExperimentButton"
import { useContext } from "react";
import AppContext from "@context/AppContext";


type Props = {
    images: string[] | undefined
}

function ResultGrid({ images }: Props) {

    const { selectedImages, setSelectedImages } = useContext(AppContext)

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 xl:gap-4'>
                {images?.map((image: string, index: number) => (
                    <div className="flex flex-col space-y-4 items-center" key={index}>
                        <img className={`cursor-pointer hover:border-4 hover:border-acid`}
                            onClick={() => {
                                if (selectedImages?.includes(image)) return
                                else setSelectedImages((prev: string[]) => [...prev, image])
                            }}
                            src={"data:image/.webp;base64," + image} />
                        <MintExperimentButton
                            className="p-4 text-white w-full text-center bg-acid cursor-pointer"
                            id={index.toString()} image={image} />
                    </div>))}
            </div>
        </div>
    )
}

export default ResultGrid