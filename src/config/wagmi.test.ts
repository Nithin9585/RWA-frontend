import { wagmiConfig } from './wagmi';
import { sepolia } from 'wagmi/chains';

describe('wagmiConfig', () => {
    it('should be configured for Sepolia', () => {
        // In Wagmi v2, config.chains is an array of chains
        const chains = wagmiConfig.chains;
        const hasSepolia = chains.some(c => c.id === sepolia.id);
        expect(hasSepolia).toBe(true);
    });
});
