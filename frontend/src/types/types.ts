import type { BigNumber } from 'ethers';

export type Vial = {
    tokenId?: BigNumber;
    name: string;
    image: string;
    type: number;
    description?: string;
    preview: string;
}

export type Style = {
    name: string,
    prompt: string,
    negative_prompt: string,
}

export type NftURI = {
    tokenId: BigNumber;
    tokenURI: string;
}