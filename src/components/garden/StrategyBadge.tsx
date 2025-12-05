import React from 'react';
import { cn } from '../common/Button';

interface StrategyBadgeProps {
    strategy: number; // 0: Conservative, 1: Balanced, 2: Aggressive
    className?: string;
}

export const StrategyBadge: React.FC<StrategyBadgeProps> = ({ strategy, className }) => {
    const getStrategyConfig = (strat: number) => {
        switch (strat) {
            case 0:
                return { label: 'Conservative', color: 'bg-green-500/20 text-green-400 border-green-500/50' };
            case 1:
                return { label: 'Balanced', color: 'bg-blue-500/20 text-blue-400 border-blue-500/50' };
            case 2:
                return { label: 'Aggressive', color: 'bg-red-500/20 text-red-400 border-red-500/50' };
            default:
                return { label: 'Unknown', color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' };
        }
    };

    const config = getStrategyConfig(strategy);

    return (
        <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', config.color, className)}>
            {config.label}
        </span>
    );
};
