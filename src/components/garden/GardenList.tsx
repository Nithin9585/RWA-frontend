'use client';

import React from 'react';
import { useGardenRegistry } from '../../hooks/useGardenRegistry';
import { GardenCard } from './GardenCard';
import { Card } from '../common/Card';

export const GardenList: React.FC = () => {
    const { gardens, isLoading, isError, error } = useGardenRegistry();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="h-64 animate-pulse bg-white/5" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400 font-bold mb-2">Failed to load gardens.</p>
                <p className="text-red-300 text-sm bg-red-900/20 p-4 rounded-lg inline-block max-w-2xl overflow-auto">
                    {error?.message || "Unknown error occurred"}
                </p>
            </div>
        );
    }

    if (gardens.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No gardens found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gardens.map((garden) => (
                <GardenCard key={garden.gardenAddress} garden={garden} />
            ))}
        </div>
    );
};
