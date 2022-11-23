import type { BigNumber } from 'ethers';

export type Vial = {
    tokenId?: number;
    name: string;
    image: string;
    type?: number;
    description?: string;
    preview: string;
    style: string;
}

export type Experiment = {
    tokenId?: number;
    name: string;
    image: string;
    type: number;
    description?: string;
    preview: string;
    style: string;
}

export type Style = {
    name: string,
    prompt: string,
    negative_prompt: null,
}

export type NftURI = {
    tokenId: BigNumber;
    tokenURI: string;
}

export type Request = {
    job_count: number
    job_hash: string
    job_no: number
}

export type Progress = {
    current_image: string,
    eta_relative: number,
    progress: number,
    state: {
        interrupted: boolean,
        job: string,
        job_count: number,
        job_no: number,
        sampling_step: number,
        sampling_steps: number,
        skipped: boolean,
        done: boolean,
    }
}

export type Base = {
    name: string,
    image: string,
    preview: string,
}