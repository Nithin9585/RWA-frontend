import React from 'react';
import { cn } from './Button'; // Reusing cn utility

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'glass', children, ...props }, ref) => {
        const variants = {
            default: 'bg-card text-card-foreground',
            glass: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl',
        };

        return (
            <div
                ref={ref}
                className={cn('rounded-2xl p-6', variants[variant], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
