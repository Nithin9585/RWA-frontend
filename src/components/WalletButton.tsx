// src/components/WalletButton.tsx
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

// Simple wrapper that shows the RainbowKit ConnectButton with address & balance
export default function WalletButton() {
    return (
        <ConnectButton
            showBalance={true}
            accountStatus={{
                smallScreen: 'address',
                largeScreen: 'full',
            }}
        />
    );
}
