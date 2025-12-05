import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { getCurrentChainAddresses } from '../constants/addresses';
import DiamondRWAYieldFacetABI from '../abis/DiamondRWAYieldFacet.json';
import IERC20ABI from '../abis/IERC20.json';
import { useChainId } from 'wagmi';
import { parseUnits } from 'viem';

export const useDeposit = (gardenAddress: `0x${string}`) => {
    const chainId = useChainId();
    const addresses = getCurrentChainAddresses(chainId);
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const approveUSDC = (amount: string) => {
        writeContract({
            address: addresses.USDC as `0x${string}`,
            abi: IERC20ABI.abi,
            functionName: 'approve',
            args: [gardenAddress, parseUnits(amount, 6)], // Assuming USDC has 6 decimals
        });
    };

    const deposit = (amount: string) => {
        writeContract({
            address: gardenAddress,
            abi: DiamondRWAYieldFacetABI.abi,
            functionName: 'deposit',
            args: [parseUnits(amount, 6)], // Deposit only takes amount
        });
    };

    return {
        approveUSDC,
        deposit,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        hash,
    };
};
