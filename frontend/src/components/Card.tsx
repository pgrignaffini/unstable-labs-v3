import React from 'react'
// import Star from './icons/Star'
// import StarFilled from './icons/StarFilled'
// import { MarketItem } from '../../typings';
// import { parseNftPrice } from '../utils/helpers';
// import CancelButton from './CancelButton';

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

    return (
        <div className='border-2 cursor-pointer hover:border-4 hover:border-acid p-4'>
            <div className='flex justify-between items-center'>
                <p className='font-pixel text-sm'>{nft?.name} {multiple && `${multiple}x`}</p>
                <img className='w-12 h-12 object-contain' src={src} alt="image" />
                {/* {onSale && <p className='font-pixel text-sm'>{parseNftPrice(nft as Nft & MarketItem)}</p>} */}
            </div>
            {
                nft?.preview && nft?.name !== "Freestyle" ? (
                    <img className='w-64 h-64 object-contain' src={nft.preview} alt="image" />
                ) : <img className='w-64 h-64 object-contain' src="/freestyle-collage.jpg" alt="image" />
            }
        </div>
    )
}

export default Card