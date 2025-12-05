'use client';

import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useGovernance } from '../../hooks/useGovernance';

interface ProposalCardProps {
    id: bigint;
    description: string;
    votesFor: bigint;
    votesAgainst: bigint;
    deadline: bigint;
    gardenAddress: `0x${string}`;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
    id,
    description,
    votesFor,
    votesAgainst,
    deadline,
    gardenAddress,
}) => {
    const { vote, isPending } = useGovernance(gardenAddress);

    const handleVote = (support: boolean) => {
        vote(id, support ? 1 : 0);
    };

    const totalVotes = votesFor + votesAgainst;
    const forPercentage = totalVotes > 0n ? Number((votesFor * 100n) / totalVotes) : 0;

    return (
        <Card>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">Proposal #{id.toString()}</h3>
                <span className="text-xs text-gray-400">
                    End Block: {deadline.toString()}
                </span>
            </div>

            <p className="text-gray-300 mb-6">{description}</p>

            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-400">For: {votesFor.toString()}</span>
                    <span className="text-red-400">Against: {votesAgainst.toString()}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ width: `${forPercentage}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                    onClick={() => handleVote(true)}
                    disabled={isPending}
                >
                    Vote For
                </Button>
                <Button
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    onClick={() => handleVote(false)}
                    disabled={isPending}
                >
                    Vote Against
                </Button>
            </div>
        </Card>
    );
};
