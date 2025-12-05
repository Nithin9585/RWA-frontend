'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGardenStats } from '../../../hooks/useGardenStats';
import { StrategyBadge } from '../../../components/garden/StrategyBadge';
import { DepositForm } from '../../../components/action/DepositForm';
import { WithdrawForm } from '../../../components/action/WithdrawForm';
import { GovernanceSection } from '../../../components/governance/GovernanceSection';
import { Card } from '../../../components/common/Card';
import { Loader } from '../../../components/common/Loader';
import { formatUnits } from 'viem';
import { Tab } from '@headlessui/react';
import { cn } from '../../../components/common/Button';

export default function GardenDetails() {
    const params = useParams();
    const address = params.address as `0x${string}`;
    const { stats, isLoading, isError } = useGardenStats(address);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader />
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-400">Error Loading Garden</h2>
                <p className="text-gray-400 mt-2">Could not fetch garden details. Please try again.</p>
            </div>
        );
    }

    // Helper to get underlying assets based on strategy
    const getAssets = (strategy: number) => {
        switch (strategy) {
            case 0: return ['Backed IB01'];
            case 1: return ['Backed IB01', 'Ondo USDY'];
            case 2: return ['Ondo OUSG', 'MatrixDock STBT'];
            default: return [];
        }
    };

    const assets = getAssets(Number(stats?.strategy));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <h1 className="text-3xl font-bold text-white">{stats.name}</h1>
                        <StrategyBadge strategy={stats.strategy} />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {assets.map((asset) => (
                            <span key={asset} className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-xs font-medium text-gray-300">
                                {asset}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-400 font-mono text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {address}
                    </p>
                </div>
                <div className="text-right bg-black/20 p-4 rounded-xl border border-white/5">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Current APY</p>
                    <p className="text-4xl font-bold text-green-400">{Number(stats.apy) / 100}%</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <p className="text-gray-400 mb-1">Total Value Locked</p>
                    <p className="text-2xl font-bold text-white">
                        ${formatUnits(stats.tvl, 6)}
                    </p>
                </Card>
                <Card>
                    <p className="text-gray-400 mb-1">Total Users</p>
                    <p className="text-2xl font-bold text-white">{stats.userCount.toString()}</p>
                </Card>
                <Card>
                    <p className="text-gray-400 mb-1">Status</p>
                    <p className={cn(
                        "text-2xl font-bold",
                        stats.isActive ? "text-green-400" : "text-red-400"
                    )}>
                        {stats.isActive ? 'Active' : 'Paused'}
                    </p>
                </Card>
            </div>

            {/* Tabs for Actions */}
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-white/5 p-1 max-w-md mx-auto mb-8">
                    {['Deposit', 'Withdraw', 'Governance'].map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                cn(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all',
                                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-transparent ring-primary/50',
                                    selected
                                        ? 'bg-primary text-white shadow'
                                        : 'text-gray-400 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel className="max-w-md mx-auto focus:outline-none">
                        <DepositForm gardenAddress={address} />
                    </Tab.Panel>
                    <Tab.Panel className="max-w-md mx-auto focus:outline-none">
                        <WithdrawForm gardenAddress={address} />
                    </Tab.Panel>
                    <Tab.Panel className="focus:outline-none">
                        <GovernanceSection gardenAddress={address} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
