import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, sepolia, foundry } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const wagmiConfig = getDefaultConfig({
    appName: 'Diamond RWA Yield Engine',
    projectId: walletConnectProjectId,
    chains: [sepolia, foundry, arbitrum],
    ssr: true,
});
