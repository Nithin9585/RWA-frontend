import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import GovernanceFacetABI from '../abis/GovernanceFacet.json';

export const useGovernance = (gardenAddress: `0x${string}`) => {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const createProposal = (targetRWA: `0x${string}`, description: string) => {
        writeContract({
            address: gardenAddress,
            abi: GovernanceFacetABI.abi,
            functionName: 'propose',
            args: [targetRWA, description],
        });
    };

    const vote = (proposalId: bigint, support: number) => {
        // support: 0 = Against, 1 = For, 2 = Abstain
        writeContract({
            address: gardenAddress,
            abi: GovernanceFacetABI.abi,
            functionName: 'castVote',
            args: [proposalId, support],
        });
    };

    return {
        createProposal,
        vote,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        hash,
    };
};
