declare namespace NodeJS {
    interface ProcessEnv {
        API_BASE_URL: string;
        NEXT_PUBLIC_PINATA_GATEWAY: string;
        NEXT_PUBLIC_IPFS_GATEWAY: string;
        NEXT_PUBLIC_INFURA_API_KEY: string;
        NEXT_PUBLIC_PRIVATE_KEY: string;
        NOVU_API_KEY: string;
        NEXT_PUBLIC_APP_ID: string;
    }
}
