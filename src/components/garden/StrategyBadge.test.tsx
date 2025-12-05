import React from 'react';
import { render, screen } from '@testing-library/react';
import { StrategyBadge } from './StrategyBadge';
import '@testing-library/jest-dom';

describe('StrategyBadge', () => {
    it('renders Conservative badge correctly', () => {
        render(<StrategyBadge strategy={0} />);
        expect(screen.getByText('Conservative')).toBeInTheDocument();
        expect(screen.getByText('Conservative')).toHaveClass('text-green-400');
    });

    it('renders Balanced badge correctly', () => {
        render(<StrategyBadge strategy={1} />);
        expect(screen.getByText('Balanced')).toBeInTheDocument();
        expect(screen.getByText('Balanced')).toHaveClass('text-blue-400');
    });

    it('renders Aggressive badge correctly', () => {
        render(<StrategyBadge strategy={2} />);
        expect(screen.getByText('Aggressive')).toBeInTheDocument();
        expect(screen.getByText('Aggressive')).toHaveClass('text-red-400');
    });
});
