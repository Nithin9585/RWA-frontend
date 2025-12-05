'use client';

import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useWithdraw } from '../../hooks/useWithdraw';

interface WithdrawFormProps {
    gardenAddress: `0x${string}`;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({ gardenAddress }) => {
    const [amount, setAmount] = useState('');
    const { withdraw, isPending, isConfirming } = useWithdraw(gardenAddress);

    const handleWithdraw = () => {
        if (!amount) return;
        withdraw(amount);
    };

    return (
        <Card>
            <h3 className="text-xl font-bold text-white mb-4">Withdraw</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Amount (Shares)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <span className="absolute right-4 top-3 text-gray-400">SHARES</span>
                    </div>
                </div>

                <Button
                    className="w-full"
                    onClick={handleWithdraw}
                    disabled={!amount || isPending || isConfirming}
                    isLoading={isPending || isConfirming}
                >
                    Withdraw
                </Button>
            </div>
        </Card>
    );
};
