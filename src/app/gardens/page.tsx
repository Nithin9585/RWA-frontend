'use client';

import React from 'react';
import { GardenList } from '../../components/garden/GardenList';

export default function GardensPage() {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Investment Gardens</h1>
                <p className="text-gray-400">
                    Select a strategy that aligns with your financial goals.
                    All gardens are backed by real-world assets and managed on-chain.
                </p>
            </div>
            <GardenList />
        </div>
    );
}
