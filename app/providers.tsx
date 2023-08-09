'use client';

import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  optimism,
  mainnet,
  goerli,
  optimismGoerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const NEXT_PUBLIC_ALCHEMY_API_KEY : string = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!;

const { chains, publicClient } = configureChains(
    [mainnet, optimism, goerli, optimismGoerli],
    [
      alchemyProvider({ apiKey: NEXT_PUBLIC_ALCHEMY_API_KEY }),
      publicProvider()
    ]
  );

const projectId = 'Vertex';

const { connectors } = getDefaultWallets({
    appName: 'Vertex',
    projectId: projectId,
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  });

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
