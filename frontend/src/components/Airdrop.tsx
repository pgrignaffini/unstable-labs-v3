import { useState, useEffect } from 'react'
import { useWaitForTransaction, useAccount, useProvider } from 'wagmi'
import vialContractInfo from "@abi/vial.json"
import SolidButton from '@components/SolidButton'
// import { Vials } from "../utils/vials"
import { ethers } from 'ethers'
import { trpc } from '@utils/trpc'
import { collections } from "@data/collections"
import { concepts } from "@data/concepts"
import { useSession } from 'next-auth/react'
import { CollectionMetadataURL, ConceptMetadataURL } from "@utils/metadata"

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    // The maximum is exclusive and the minimum is inclusive
}


function Airdrop() {


    const freeVials = 3
    const [counter, setCounter] = useState(0)
    const [isDone, setIsDone] = useState(false)
    const [isError, setIsError] = useState(false)
    const { address } = useAccount()
    const provider = useProvider()
    const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider)
    const vialNFTContract = new ethers.Contract(vialContractInfo.address, vialContractInfo.abi, signer)
    const [minting, setMinting] = useState<boolean>(false)
    const [tx, setTx] = useState<ethers.providers.TransactionResponse | undefined>(undefined)

    const { data: session } = useSession()

    const { data: user } = trpc.user.getUser.useQuery({
        id: session?.user?.id || '1'
    }, {
        enabled: !!session?.user?.id,
        refetchInterval: 5000,
    })

    const updateClaimMutation = trpc.user.updateClaim.useMutation()

    useEffect(() => {
        console.log('counter', counter)
        if (counter === freeVials) {
            setMinting(false)
            setIsDone(true)
            updateClaimMutation.mutate({ id: user?.id as string })
        }
    }, [counter])

    useWaitForTransaction({
        enabled: !!tx,
        hash: tx?.hash as `0x${string}`,
        onError(error) {
            console.log("Error minting vials: ", error.message)
            setMinting(false)
            setIsError(true)
        },
        onSuccess: (receipt) => {
            console.log("Success minting vials: ", receipt)
            setTx(undefined)
            setCounter((prev) => prev + 1)
        }
    })

    const getRandomURI = (type: string) => {
        const randomIndex = getRandomInt(0, type === "collection" ? collections.length : concepts.length)
        const tokenURI = type === "concept" ? `${ConceptMetadataURL}/${randomIndex}.json` : `${CollectionMetadataURL}/${randomIndex}.json`
        return tokenURI
    }

    const handleClick = async () => {
        const types = ["collection", "concept"]
        setMinting(true)
        for (let i = 0; i < freeVials; i++) {
            const type = types[getRandomInt(0, types.length)]
            console.log("type: ", type)
            const tokenURI = getRandomURI(type as string)
            const tx: ethers.providers.TransactionResponse = await vialNFTContract?.airdropVials?.(tokenURI, 1, address)
                .catch((error: Error) => {
                    console.log("Error minting vials: ", error.message)
                    setMinting(false)
                    setIsError(true)
                })
            // wait 10 seconds before minting next vial
            await new Promise((resolve) => setTimeout(resolve, 10000))
            console.log("tx hash: ", tx?.hash)
            setTx(tx)
        }
    }

    return (
        <>
            {user && !user.hasClaimedVials &&
                <div className='flex flex-col space-y-4 justify-center items-center'>
                    {!isError && !minting && !isDone && <p className='text-center text-sm text-acid bg-black p-2'>Hey! You&apos;re eligible for some free vials!</p>}
                    {isError && <p className=" text-center text-sm text-red-500  bg-black p-2">Well, something went wrong...try again later</p>}
                    {minting && <p className='text-center text-sm text-acid  bg-black p-2'>We&apos;re brewing your vials, just a minute...</p>}
                    {isDone && <p className='text-center text-sm text-acid  bg-black p-2'>You have claimed your free vials!</p>}
                    <SolidButton text='Claim Airdrop' onClick={handleClick} className="bg-acid text-white" loading={minting} />
                </div>
            }
        </>
    )
}

export default Airdrop