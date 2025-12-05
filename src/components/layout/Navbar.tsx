'use client';

import React from 'react';
import Link from 'next/link';
import WalletButton from '../WalletButton';
import { usePathname } from 'next/navigation';
import { cn } from '../common/Button';

export const Navbar: React.FC = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/' },
        { name: 'Gardens', href: '/gardens' },
        { name: 'Governance', href: '/governance' },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Diamond RWA
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-white" : "text-gray-400"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <WalletButton />
                </div>
            </div>
        </nav>
    );
};
