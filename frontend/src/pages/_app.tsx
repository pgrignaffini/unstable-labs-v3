import React from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@utils/trpc";
import "@styles/globals.css";
import dynamic from 'next/dynamic'
import { WagmiConfig, createClient, Chain } from 'wagmi'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Request } from "../types/types";
import AppContext from "@context/AppContext"
import { ConnectKitProvider, getDefaultClient, } from "connectkit";
import { Analytics } from '@vercel/analytics/react';


const Header = dynamic(
  () => import('@components/Header'),
  { ssr: false }
)

const Footer = dynamic(
  () => import('@components/Footer'),
  { ssr: false }
)

const Aurora: Chain = {
  id: 1313161555,
  name: 'Aurora Testnet',
  network: 'Aurora Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Aurora ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://testnet.aurora.dev/',
  },
  blockExplorers: {
    default: { name: 'AuroraScan', url: 'https://testnet.aurorascan.dev/' },
  },
  testnet: true,
}

// const { provider } = configureChains([Aurora], [
//   infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
//   publicProvider(),
// ])

const infuraId = process.env.NEXT_PUBLIC_INFURA_API_KEY
const chains = [Aurora]

// const client = createClient({
//   autoConnect: true,
//   provider
// })

const client = createClient(
  getDefaultClient({
    appName: "UnstableLabs",
    infuraId,
    chains,
  }),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const [request, setRequest] = useState<Request | undefined>(undefined)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState(false)

  const customTheme = {
    "--ck-font-family": '"Press Start 2P", sans',
    "--ck-border-radius": 1,
    "--ck-primary-button-border-radius": 1,
    "--ck-secondary-button-border-radius": 1,
    "--ck-connectbutton-border-radius": 1,
    "--ck-connectbutton-background": "#b4e61d",
    "--ck-connectbutton-hover-background": "#354407",
    "--ck-connectbutton-font-size": "12px",
    "--ck-body-disclaimer-font-size": "9px",
    "--ck-body-font-size": "9px"
  }

  return (
    <SessionProvider session={session}>
      <WagmiConfig client={client}>
        <ConnectKitProvider customTheme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <div className="bg-black min-h-screen w-screen">
              <Header />
              <AppContext.Provider
                value={{
                  request, setRequest,
                  selectedImages, setSelectedImages,
                  selectedImage, setSelectedImage,
                  isPlaying, setIsPlaying
                }}>
                <Component {...pageProps} />
                <Analytics />
              </AppContext.Provider>
              <Footer />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
