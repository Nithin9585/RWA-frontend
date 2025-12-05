import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import DiamondRWAYieldFacetABI from '../abis/DiamondRWAYieldFacet.json';
import { parseUnits } from 'viem';

export const useWithdraw = (gardenAddress: `0x${string}`) => {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const withdraw = (amount: string) => {
        writeContract({
            address: gardenAddress,
            abi: DiamondRWAYieldFacetABI.abi,
            functionName: 'withdraw',
            args: [parseUnits(amount, 18)], // Assuming shares have 18 decimals
        });
    };

    return {
        withdraw,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        hash,
    };
};
