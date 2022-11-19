import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@utils/trpc";
import "@styles/globals.css";
import dynamic from 'next/dynamic'
import { WagmiConfig, createClient, configureChains, Chain } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import Footer from "@components/Footer";
const Header = dynamic(
  () => import('@components/Header'),
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

const { provider } = configureChains([Aurora], [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  provider
})

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
  return (
    <SessionProvider session={session}>
      <WagmiConfig client={client}>
        <QueryClientProvider client={queryClient}>
          <div className="bg-black min-h-screen min-w-fit">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
