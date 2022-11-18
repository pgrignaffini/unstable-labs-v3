import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchNetwork, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import makeBlockie from "ethereum-blockies-base64"

function ConnectWallet() {
    const chainId = 1313161555
    const { address, isConnected } = useAccount()
    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()
    const isMismatched = chainId !== chain?.id
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
    const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

    useEffect(() => {
        if (isMismatched) {
            switchNetwork?.(chainId);
        }
    }, [address]);

    return (
        <>
            {
                isConnected ?
                    <div className='flex space-x-3 items-end' >
                        <img src={makeBlockie(address as string)} className="w-8 h-8" />
                        <p className='font-pixel text-white'>{displayAddress}</p>
                        <button className='bg-acid text-white p-2 text-sm font-pixel' onClick={() => disconnect()}>Disconnect</button>
                    </div>
                    :
                    <button className='bg-acid text-white text-sm p-2 font-pixel' onClick={() => connect()}>Connect Wallet</button>
            }
        </>
    )
}

export default ConnectWallet
