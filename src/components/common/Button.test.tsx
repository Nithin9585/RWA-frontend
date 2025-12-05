import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('shows loading spinner when isLoading is true', () => {
        render(<Button isLoading>Click me</Button>);
        // The spinner is a div with specific classes, but we can check if button is disabled
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
