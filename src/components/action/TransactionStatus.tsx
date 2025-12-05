'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '../common/Button';

interface TransactionStatusProps {
    hash?: string;
    isPending: boolean;
    isConfirming: boolean;
    isConfirmed: boolean;
    error?: Error | null;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isPending || isConfirming || isConfirmed || error) {
            setVisible(true);
            if (isConfirmed || error) {
                const timer = setTimeout(() => setVisible(false), 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [isPending, isConfirming, isConfirmed, error]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className={cn(
                "rounded-lg p-4 shadow-lg border backdrop-blur-md max-w-sm w-full",
                error ? "bg-red-500/10 border-red-500/20" : "bg-primary/10 border-primary/20"
            )}>
                <div className="flex items-start gap-3">
                    {isPending || isConfirming ? (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : isConfirmed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                    )}

                    <div className="flex-1">
                        <h4 className={cn(
                            "text-sm font-medium",
                            error ? "text-red-400" : "text-white"
                        )}>
                            {isPending ? 'Confirm in Wallet' :
                                isConfirming ? 'Transaction Pending' :
                                    isConfirmed ? 'Transaction Successful' :
                                        'Transaction Failed'}
                        </h4>

                        {hash && (
                            <a
                                href={`https://sepolia.etherscan.io/tx/${hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-400 hover:text-primary mt-1 block truncate"
                            >
                                View on Explorer
                            </a>
                        )}

                        {error && (
                            <p className="text-xs text-red-400 mt-1">
                                {error.message.slice(0, 100)}...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
