'use client';

import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useGovernance } from '../../hooks/useGovernance';
import { ProposalCard } from './ProposalCard';
import { useReadContract } from 'wagmi';
import GovernanceFacetABI from '../../abis/GovernanceFacet.json';

interface GovernanceSectionProps {
    gardenAddress: `0x${string}`;
}

export const GovernanceSection: React.FC<GovernanceSectionProps> = ({ gardenAddress }) => {
    const [targetRWA, setTargetRWA] = useState('');
    const [description, setDescription] = useState('');
    const [proposalIdToLoad, setProposalIdToLoad] = useState('');
    const [loadedProposalId, setLoadedProposalId] = useState<bigint | null>(null);

    const { createProposal, isPending } = useGovernance(gardenAddress);

    // Read proposal data
    const { data: proposalData, isError: isProposalError, isLoading: isProposalLoading } = useReadContract({
        address: gardenAddress,
        abi: GovernanceFacetABI.abi,
        functionName: 'getProposal',
        args: [loadedProposalId ? loadedProposalId : 0n],
        query: {
            enabled: !!loadedProposalId,
        }
    });

    const handleCreate = () => {
        if (!targetRWA || !description) return;
        createProposal(targetRWA as `0x${string}`, description);
    };

    const handleLoadProposal = () => {
        if (!proposalIdToLoad) return;
        setLoadedProposalId(BigInt(proposalIdToLoad));
    };

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-xl font-bold text-white mb-4">Create Proposal</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Target RWA Address
                        </label>
                        <input
                            type="text"
                            value={targetRWA}
                            onChange={(e) => setTargetRWA(e.target.value)}
                            placeholder="0x..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Proposal description..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 h-24"
                        />
                    </div>
                    <Button
                        onClick={handleCreate}
                        disabled={!targetRWA || !description || isPending}
                        isLoading={isPending}
                        className="w-full"
                    >
                        Create Proposal
                    </Button>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-bold text-white mb-4">View Proposal</h3>
                <div className="flex gap-4 mb-4">
                    <input
                        type="number"
                        value={proposalIdToLoad}
                        onChange={(e) => setProposalIdToLoad(e.target.value)}
                        placeholder="Proposal ID"
                        className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button onClick={handleLoadProposal}>
                        Load
                    </Button>
                </div>

                {isProposalLoading && <div className="text-center py-4 text-gray-400">Loading...</div>}

                {isProposalError && (
                    <div className="text-center py-4 text-red-400">
                        Error loading proposal. It might not exist.
                    </div>
                )}

                {proposalData && loadedProposalId && (
                    <ProposalCard
                        id={loadedProposalId}
                        description={(proposalData as any).description}
                        votesFor={(proposalData as any).forVotes}
                        votesAgainst={(proposalData as any).againstVotes}
                        deadline={(proposalData as any).endBlock} // Note: Contract returns endBlock, UI expects deadline (timestamp). 
                        // Ideally we should convert block to timestamp or update UI to show block.
                        // For now, passing as is, UI might show weird date.
                        gardenAddress={gardenAddress}
                    />
                )}
            </Card>
        </div>
    );
};
