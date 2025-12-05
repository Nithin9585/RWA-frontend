'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import Link from 'next/link';

export default function Dashboard() {
    const { address, isConnected } = useAccount();

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <h1 className="text-3xl font-bold text-white">Connect Wallet</h1>
                <p className="text-gray-400 max-w-md">
                    Please connect your wallet to view your dashboard, portfolio summary, and active investments.
                </p>
                {/* WalletButton is in Navbar, so user can click there, or we can add a hint */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-300">
                        Click the "Connect Wallet" button in the top right corner.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 font-mono text-sm">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
            </div>

            {/* Portfolio Summary */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <p className="text-gray-400 mb-2">Total Balance</p>
                    <p className="text-3xl font-bold text-white">$0.00</p>
                    <p className="text-sm text-green-400 mt-1">+0.0% (24h)</p>
                </Card>
                <Card>
                    <p className="text-gray-400 mb-2">Total Earnings</p>
                    <p className="text-3xl font-bold text-green-400">$0.00</p>
                </Card>
                <Card>
                    <p className="text-gray-400 mb-2">Active Investments</p>
                    <p className="text-3xl font-bold text-blue-400">0</p>
                </Card>
            </section>

            {/* My Gardens */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">My Gardens</h2>
                <Card className="text-center py-12">
                    <p className="text-gray-400 mb-4">You haven't deposited into any gardens yet.</p>
                    <Link href="/gardens">
                        <Button>Explore Gardens</Button>
                    </Link>
                </Card>
            </section>

            {/* Recent Activity */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                <Card>
                    <div className="text-center py-8 text-gray-500">
                        No recent transactions found.
                    </div>
                </Card>
            </section>
        </div>
    );
}
