import { createPublicClient, http } from 'viem';
import { foundry } from 'viem/chains';
import { ADDRESSES } from '../constants/addresses';
import GardenRegistryArtifact from '../abis/GardenRegistry.json';

// Use the ABI from the artifact
const GardenRegistryABI = GardenRegistryArtifact.abi;

describe('Integration Tests', () => {
    const client = createPublicClient({
        chain: foundry,
        transport: http('http://127.0.0.1:8545'),
    });

    const registryAddress = ADDRESSES[foundry.id].GARDEN_REGISTRY as `0x${string}`;

    it('should fetch all gardens from the registry', async () => {
        try {
            const gardens = await client.readContract({
                address: registryAddress,
                abi: GardenRegistryABI,
                functionName: 'getAllGardens',
            });

            console.log('Gardens fetched:', gardens);
            expect(Array.isArray(gardens)).toBe(true);
            // We expect at least the 3 initial gardens deployed
            expect(gardens.length).toBeGreaterThanOrEqual(3);
        } catch (error) {
            console.error('Integration test failed. Is Anvil running?', error);
            // If Anvil is not running, we skip or fail gracefully, but for this task we want to assert.
            // For now, let's fail if it can't connect.
            throw error;
        }
    });

    it('should verify specific garden addresses', async () => {
        const gardens = (await client.readContract({
            address: registryAddress,
            abi: GardenRegistryABI,
            functionName: 'getAllGardens',
        })) as string[];

        const knownGardens = Object.values(ADDRESSES[foundry.id].GARDENS).map(g => g.toLowerCase());
        const fetchedGardens = gardens.map(g => g.toLowerCase());

        knownGardens.forEach(known => {
            expect(fetchedGardens).toContain(known);
        });
    });
});
