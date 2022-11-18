// import { MarketItem } from '../../typings';
// import { parseNftPrice } from '../utils/helpers';
import Image from 'next/image';
import { RemixPreviewImageURL, ConceptPreviewImageURL } from '@utils/images';

type Props = {
    nft: {
        image: string
        name: string
        description?: string
        preview?: string
    }
    multiple?: number
    isVial?: boolean
}

function Card({ nft, multiple, isVial }: Props) {

    const src = isVial ? nft?.image : "data:image/.webp;base64," + nft?.image

    const showNftModal = (
        <>
            <input type="checkbox" id={nft.name} className="modal-toggle" />
            <div className="modal h-full w-full">
                <div className="flex flex-col space-y-3">
                    <label htmlFor={nft.name} className="text-2xl text-white cursor-pointer">X</label>
                    <img src={src} alt={nft?.name} className="w-full" />
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-sm lg:text-lg 2xl:text-2xl font-bold">{nft?.name}</h1>
                        {nft?.description && <p className="text-sm lg:text-md 2xl:text-lg italic">&quot;{nft.description}&quot;</p>}
                    </div>
                </div>
            </div>
        </>
    )


    const vialLayout = (
        <div className='flex flex-col justify-between items-center'>
            <div className='flex items-center justify-between'>
                <p className='font-pixel text-sm'>{nft?.name} {multiple && `${multiple}x`}</p>
                <img className='w-12 h-12 object-contain' src={src} alt="image" />
                {/* onSale && <p className='font-pixel text-sm'>{parseNftPrice(nft as Nft & MarketItem)}</p> */}
            </div>
            {nft.name === "Freestyle" ? <img src="/freestyle-collage.jpg" className='w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-48 xl:h-48 2xl:h-64 2xl:w-64 mt-4' /> :
                <div className='w-64 h-64 relative mt-4'>
                    <Image src={nft?.preview as string} alt="preview" placeholder='blur' blurDataURL={RemixPreviewImageURL} fill objectFit='contain' />
                </div>}
        </div>
    )

    const nftLayout = (
        <div className="flex flex-col">
            <label htmlFor={nft.name} className='cursor-pointer space-y-2'>
                <div className='w-auto h-32 md:h-48 2xl:h-60 relative'>
                    <Image src={src} alt={nft?.name} fill objectFit='cover' />
                </div>
                <div className="text-white text-center text-sm lg:text-lg 2xl:text-xl font-bold">{nft?.name}</div>
            </label>
        </div>
    )


    return (
        <>
            {isVial ? null : showNftModal}
            <div className='border-2 hover:border-4  hover:border-acid hover:-m-1 p-4'>
                {isVial ? vialLayout : nftLayout}
            </div>
        </>
    )
}

export default Card