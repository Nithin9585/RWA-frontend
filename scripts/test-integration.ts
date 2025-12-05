import { createPublicClient, http } from 'viem';
import { foundry } from 'viem/chains';
import { ADDRESSES } from '../src/constants/addresses';
import GardenRegistryArtifact from '../src/abis/GardenRegistry.json';

// Use the ABI from the artifact
const GardenRegistryABI = GardenRegistryArtifact.abi;

async function main() {
    console.log('Starting integration test...');

    const client = createPublicClient({
        chain: foundry,
        transport: http('http://127.0.0.1:8545'),
    });

    const registryAddress = ADDRESSES[foundry.id].GARDEN_REGISTRY as `0x${string}`;
    console.log(`Registry Address: ${registryAddress}`);

    try {
        const gardens = await client.readContract({
            address: registryAddress,
            abi: GardenRegistryABI,
            functionName: 'getAllGardens',
        }) as string[];

        console.log('Gardens fetched:', gardens);

        if (!Array.isArray(gardens)) {
            throw new Error('Gardens is not an array');
        }

        if (gardens.length < 3) {
            throw new Error(`Expected at least 3 gardens, found ${gardens.length}`);
        }

        const knownGardens = Object.values(ADDRESSES[foundry.id].GARDENS).map(g => g.toLowerCase());
        const fetchedGardens = gardens.map(g => g.toLowerCase());

        knownGardens.forEach(known => {
            if (!fetchedGardens.includes(known)) {
                throw new Error(`Expected garden ${known} not found in fetched gardens`);
            }
        });

        console.log('Integration test passed successfully!');
    } catch (error) {
        console.error('Integration test failed:', error);
        process.exit(1);
    }
}

main();
