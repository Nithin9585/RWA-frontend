import fs from 'fs';
import path from 'path';

// Define the structure of the deployed addresses
interface DeployedAddresses {
    registry: string;
    factory: string;
    templateFacets: {
        diamondCutFacet: string;
        rwaFacetV2: string;
        governanceFacet: string;
    };
    gardens: {
        conservative: string;
        balanced: string;
        aggressive: string;
    };
}

// Function to parse the output and extract addresses
function parseDeploymentOutput(output: string): DeployedAddresses {
    const registryMatch = output.match(/GardenRegistry: (0x[a-fA-F0-9]{40})/);
    const factoryMatch = output.match(/GardenFactory: (0x[a-fA-F0-9]{40})/);

    const diamondCutMatch = output.match(/DiamondCutFacet: (0x[a-fA-F0-9]{40})/);
    const rwaFacetMatch = output.match(/DiamondRWAYieldFacetV2: (0x[a-fA-F0-9]{40})/);
    const governanceFacetMatch = output.match(/GovernanceFacet: (0x[a-fA-F0-9]{40})/);

    const conservativeMatch = output.match(/Conservative Garden deployed: (0x[a-fA-F0-9]{40})/);
    const balancedMatch = output.match(/Balanced Garden deployed: (0x[a-fA-F0-9]{40})/);
    const aggressiveMatch = output.match(/Aggressive Garden deployed: (0x[a-fA-F0-9]{40})/);

    if (!registryMatch || !factoryMatch || !diamondCutMatch || !rwaFacetMatch || !governanceFacetMatch || !conservativeMatch || !balancedMatch || !aggressiveMatch) {
        throw new Error('Could not parse all addresses from output');
    }

    return {
        registry: registryMatch[1],
        factory: factoryMatch[1],
        templateFacets: {
            diamondCutFacet: diamondCutMatch[1],
            rwaFacetV2: rwaFacetMatch[1],
            governanceFacet: governanceFacetMatch[1],
        },
        gardens: {
            conservative: conservativeMatch[1],
            balanced: balancedMatch[1],
            aggressive: aggressiveMatch[1],
        },
    };
}

// Main function to update the addresses file
function updateAddressesFile(addresses: DeployedAddresses) {
    const addressesFilePath = path.join(__dirname, '../src/constants/addresses.ts');

    const fileContent = `import { foundry } from 'wagmi/chains';

export const ADDRESSES = {
  [foundry.id]: {
    GARDEN_REGISTRY: '${addresses.registry}',
    GARDEN_FACTORY: '${addresses.factory}',
    GARDENS: {
      CONSERVATIVE: '${addresses.gardens.conservative}',
      BALANCED: '${addresses.gardens.balanced}',
      AGGRESSIVE: '${addresses.gardens.aggressive}',
    },
    FACETS: {
      DIAMOND_CUT: '${addresses.templateFacets.diamondCutFacet}',
      DIAMOND_RWA_YIELD: '${addresses.templateFacets.rwaFacetV2}',
      GOVERNANCE: '${addresses.templateFacets.governanceFacet}',
    },
    // Add USDC address if known, otherwise placeholder
    USDC: '0x0000000000000000000000000000000000000000', // Replace with actual mock USDC address if available
  },
} as const;

export const getCurrentChainAddresses = (chainId: number) => {
  return ADDRESSES[chainId as keyof typeof ADDRESSES] || ADDRESSES[foundry.id];
};
`;

    fs.writeFileSync(addressesFilePath, fileContent);
    console.log('Successfully updated src/constants/addresses.ts');
}

// Example usage: Read from a file or paste the output here
// For this script, we'll assume the output is passed as a command line argument or read from a file
// To make it easy, let's read from a file named 'deployment-output.txt' in the scripts folder
const deploymentOutputFilePath = path.join(__dirname, 'deployment-output.txt');

if (fs.existsSync(deploymentOutputFilePath)) {
    const output = fs.readFileSync(deploymentOutputFilePath, 'utf-8');
    try {
        const addresses = parseDeploymentOutput(output);
        updateAddressesFile(addresses);
    } catch (error) {
        console.error('Error parsing deployment output:', error);
    }
} else {
    console.log('Please create a file named "deployment-output.txt" in the scripts folder with the deployment output.');
}
