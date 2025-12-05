import { useReadContract } from 'wagmi';
import { getCurrentChainAddresses } from '../constants/addresses';
import GardenRegistryABI from '../abis/GardenRegistry.json';
import { useChainId } from 'wagmi';

export interface GardenInfo {
    gardenAddress: `0x${string}`;
    strategy: number;
    name: string;
    tvl: bigint;
    apy: bigint;
    userCount: bigint;
    isActive: boolean;
}

export const useGardenRegistry = () => {
    const chainId = useChainId();
    const addresses = getCurrentChainAddresses(chainId);

    const { data: gardens, isError, isLoading, refetch, error } = useReadContract({
        address: addresses.GARDEN_REGISTRY as `0x${string}`,
        abi: GardenRegistryABI.abi,
        functionName: 'getAllGardenStats',
        chainId: chainId,
    });

    console.log('Chain ID:', chainId);
    console.log('Registry Address:', addresses.GARDEN_REGISTRY);
    console.log('Gardens Data:', gardens);
    console.log('Is Error:', isError);
    console.log('Error Details:', error);

    return {
        gardens: (gardens as GardenInfo[]) || [],
        isLoading,
        isError,
        error,
        refetch,
    };
};
