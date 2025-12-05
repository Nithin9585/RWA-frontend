'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProposalDetails() {
    const params = useParams();
    const id = params.id;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Link href="/governance">
                <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                    <ArrowLeft className="w-4 h-4" /> Back to Governance
                </Button>
            </Link>

            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">Proposal #{id}</h1>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm border border-green-500/50">
                        Active
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-400 text-sm border border-white/10">
                        Ends in 2 days
                    </span>
                </div>
            </div>

            <Card>
                <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                    This is a placeholder for the proposal description. In a real application,
                    this data would be fetched from the contract or an indexer based on the Proposal ID.

                    The proposal aims to adjust the risk parameters for the Aggressive Garden strategy,
                    increasing the allocation to high-yield corporate bonds by 5%.
                </p>
            </Card>

            <Card>
                <h2 className="text-xl font-bold text-white mb-6">Current Results</h2>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-white">For</span>
                            <span className="text-white">75%</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-3/4" />
                        </div>
                        <p className="text-sm text-gray-400 mt-1">150,000 Votes</p>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-white">Against</span>
                            <span className="text-white">25%</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-1/4" />
                        </div>
                        <p className="text-sm text-gray-400 mt-1">50,000 Votes</p>
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="text-xl font-bold text-white mb-4">Cast Your Vote</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">Vote For</Button>
                    <Button className="bg-red-600 hover:bg-red-700">Vote Against</Button>
                </div>
            </Card>
        </div>
    );
}
