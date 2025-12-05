import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { StrategyBadge } from './StrategyBadge';
import { GardenInfo } from '../../hooks/useGardenRegistry';
import { formatUnits } from 'viem';
import Link from 'next/link';

interface GardenCardProps {
    garden: GardenInfo;
}

export const GardenCard: React.FC<GardenCardProps> = ({ garden }) => {
    // Helper to get underlying assets based on strategy
    const getAssets = (strategy: number) => {
        switch (strategy) {
            case 0: return ['Backed IB01'];
            case 1: return ['Backed IB01', 'Ondo USDY'];
            case 2: return ['Ondo OUSG', 'MatrixDock STBT'];
            default: return [];
        }
    };

    const assets = getAssets(Number(garden.strategy));

    return (
        <Card className="hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden">
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                            {garden.name}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <StrategyBadge strategy={garden.strategy} />
                            {assets.map((asset) => (
                                <span key={asset} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400">
                                    {asset}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-right bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">APY</p>
                        <p className="text-3xl font-bold text-green-400">
                            {Number(garden.apy) / 100}%
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 group-hover:border-white/10 transition-colors">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">TVL</p>
                        <p className="text-xl font-bold text-white">
                            ${formatUnits(garden.tvl, 6)}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 group-hover:border-white/10 transition-colors">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Users</p>
                        <p className="text-xl font-bold text-white">
                            {garden.userCount.toString()}
                        </p>
                    </div>
                </div>

                <Link href={`/garden/${garden.gardenAddress}`} className="w-full block">
                    <Button className="w-full h-12 text-base font-medium bg-white/10 hover:bg-primary hover:text-white border-0 transition-all">
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
};
