import { useState, useEffect } from 'react'
import { useWaitForTransaction, useAccount, useProvider } from 'wagmi'
import vialContractInfo from "@abi/vial.json"
import SolidButton from '@components/SolidButton'
import { ethers } from 'ethers'
import { trpc } from '@utils/trpc'
import { collections } from "@data/collections"
import { concepts } from "@data/concepts"
import { CollectionMetadataURL, ConceptMetadataURL, FreestyleMetadataURL, RemixMetadataURL } from "@utils/metadata"
import { useLoggedUser } from '@hooks/useLoggedUser'
import { useVials } from '@hooks/useVials'

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    // The maximum is exclusive and the minimum is inclusive
}


function Airdrop() {

    const { refetchVials } = useVials()
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

    const { user } = useLoggedUser()

    const updateClaimMutation = trpc.user.updateClaim.useMutation()

    useEffect(() => {
        console.log('counter', counter)
        if (counter >= freeVials + 2) {
            setMinting(false)
            setIsDone(true)
            refetchVials()
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

    const airdrop = async (tokenURI: string, num: number, address: string) => {
        const tx: ethers.providers.TransactionResponse = await vialNFTContract?.airdropVials?.(tokenURI, num, address)
            .catch((error: Error) => {
                console.log("Error minting vials: ", error.message)
                setMinting(false)
                setIsError(true)
                return
            })
        return tx
    }


    const handleClick = async () => {
        setMinting(true)
        // airdrop freestyle vial
        const tx = await airdrop(FreestyleMetadataURL, 1, address as string)
        setTx(tx)
        await new Promise((resolve) => setTimeout(resolve, 10000))

        // airdrop remix vial
        const tx2 = await airdrop(RemixMetadataURL, 2, address as string)
        setTx(tx2)
        await new Promise((resolve) => setTimeout(resolve, 10000))

        const types = ["collection", "concept"]
        for (let i = 0; i < freeVials; i++) {
            const type = types[getRandomInt(0, types.length)]
            console.log("type: ", type)
            const tokenURI = getRandomURI(type as string)
            const tx = await airdrop(tokenURI, 1, address as string)
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
                    {minting && <p className='text-center text-sm text-acid  bg-black p-2'>
                        We&apos;re brewing your vials, just a minute...<br />
                        Finished brewing {counter + 1} of {freeVials + 3} vials
                    </p>
                    }
                    {isDone && <p className='text-center text-sm text-acid  bg-black p-2'>You have claimed your free vials!</p>}
                    <SolidButton color='green' text='Claim Airdrop' onClick={handleClick} className="bg-acid text-white" loading={minting} />
                </div>
            }
        </>
    )
}

export default Airdrop