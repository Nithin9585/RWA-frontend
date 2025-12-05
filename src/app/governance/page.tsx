'use client';

import React from 'react';
import { ProposalCard } from '../../components/governance/ProposalCard';
import { Card } from '../../components/common/Card';

// Mock data for proposals
const MOCK_PROPOSALS = [
    {
        id: 1n,
        description: "Update Aggressive Garden allocation to include 10% high-yield corporate bonds.",
        votesFor: 150000n,
        votesAgainst: 20000n,
        deadline: 1735689600n, // Static timestamp (e.g., Jan 1, 2025)
        gardenAddress: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    },
    {
        id: 2n,
        description: "Reduce management fee for Balanced Garden to 0.5%.",
        votesFor: 80000n,
        votesAgainst: 90000n,
        deadline: 1735948800n, // Static timestamp (e.g., Jan 4, 2025)
        gardenAddress: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    },
];

export default function GovernancePage() {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Governance</h1>
                <p className="text-gray-400">
                    Participate in the decision-making process. Vote on proposals to shape the future of the Diamond RWA Yield Engine.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_PROPOSALS.map((proposal) => (
                    <ProposalCard key={proposal.id.toString()} {...proposal} />
                ))}
            </div>

            <Card className="text-center py-8 mt-8 bg-white/5 border-dashed border-white/10">
                <p className="text-gray-400">No other active proposals at this time.</p>
            </Card>
        </div>
    );
}
