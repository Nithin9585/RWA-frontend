'use client';

import React from 'react';
import { GardenList } from '../components/garden/GardenList';
import { Button } from '../components/common/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20 md:py-32 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300 font-medium">Live on Sepolia Testnet</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
              Diamond RWA
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Yield Engine
            </span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Institutional-grade yields, simplified. <br className="hidden md:block" />
          Access <span className="text-white font-semibold">US Treasury Bills</span> and <span className="text-white font-semibold">Corporate Bonds</span> on-chain.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 pt-8">
          <Link href="/gardens">
            <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Start Earning <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
          <p className="text-gray-400 mb-2 font-medium">Total Value Locked</p>
          <p className="text-4xl font-bold text-white tracking-tight">$900,000+</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
          <p className="text-gray-400 mb-2 font-medium">Average APY</p>
          <p className="text-4xl font-bold text-green-400 tracking-tight">5.2%</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
          <p className="text-gray-400 mb-2 font-medium">Active Gardens</p>
          <p className="text-4xl font-bold text-blue-400 tracking-tight">3</p>
        </div>
      </section>

      {/* Gardens List */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Investment Gardens</h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Curated strategies designed to match your risk appetite.
              From risk-free T-Bills to high-yield bond portfolios.
            </p>
          </div>
          <Link href="/gardens">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              View All Strategies <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <GardenList />
      </section>
    </div>
  );
}
