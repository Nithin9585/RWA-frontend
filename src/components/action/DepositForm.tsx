'use client';

import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useDeposit } from '../../hooks/useDeposit';
import { parseUnits } from 'viem';

interface DepositFormProps {
    gardenAddress: `0x${string}`;
}

export const DepositForm: React.FC<DepositFormProps> = ({ gardenAddress }) => {
    const [amount, setAmount] = useState('');
    const { approveUSDC, deposit, isPending, isConfirming } = useDeposit(gardenAddress);

    const handleApprove = () => {
        if (!amount) return;
        approveUSDC(amount);
    };

    const handleDeposit = () => {
        if (!amount) return;
        deposit(amount);
    };

    return (
        <Card>
            <h3 className="text-xl font-bold text-white mb-4">Deposit USDC</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Amount
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <span className="absolute right-4 top-3 text-gray-400">USDC</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="secondary"
                        onClick={handleApprove}
                        disabled={!amount || isPending || isConfirming}
                        isLoading={isPending || isConfirming}
                    >
                        Approve
                    </Button>
                    <Button
                        onClick={handleDeposit}
                        disabled={!amount || isPending || isConfirming}
                        isLoading={isPending || isConfirming}
                    >
                        Deposit
                    </Button>
                </div>
            </div>
        </Card>
    );
};
