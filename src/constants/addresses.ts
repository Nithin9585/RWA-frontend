import { foundry, sepolia } from 'wagmi/chains';
import deployments from '../config/deployments.json';

export const ADDRESSES = {
  [foundry.id]: {
    GARDEN_REGISTRY: deployments.GARDEN_REGISTRY,
    GARDEN_FACTORY: deployments.GARDEN_FACTORY,
    GARDENS: deployments.GARDENS,
    FACETS: deployments.FACETS,
    USDC: deployments.USDC,
  },
  [sepolia.id]: {
    GARDEN_REGISTRY: deployments.GARDEN_REGISTRY,
    GARDEN_FACTORY: deployments.GARDEN_FACTORY,
    GARDENS: deployments.GARDENS,
    FACETS: deployments.FACETS,
    USDC: deployments.USDC,
  },
} as const;

export const getCurrentChainAddresses = (chainId: number) => {
  return ADDRESSES[chainId as keyof typeof ADDRESSES] || ADDRESSES[sepolia.id];
};
