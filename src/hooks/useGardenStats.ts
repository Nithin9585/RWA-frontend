import { useReadContract } from 'wagmi';
import { getCurrentChainAddresses } from '../constants/addresses';
import GardenRegistryABI from '../abis/GardenRegistry.json';
import { useChainId } from 'wagmi';
import { GardenInfo } from './useGardenRegistry';

export const useGardenStats = (gardenAddress: `0x${string}`) => {
    const chainId = useChainId();
    const addresses = getCurrentChainAddresses(chainId);

    const { data: stats, isError, isLoading, refetch } = useReadContract({
        address: addresses.GARDEN_REGISTRY as `0x${string}`,
        abi: GardenRegistryABI.abi,
        functionName: 'getGardenStats',
        args: [gardenAddress],
    });

    return {
        stats: stats as GardenInfo | undefined,
        isLoading,
        isError,
        refetch,
    };
};
