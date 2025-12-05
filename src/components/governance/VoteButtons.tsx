import React from 'react';
import { Button } from '../common/Button';

interface VoteButtonsProps {
    onVote: (support: boolean) => void;
    isLoading?: boolean;
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({ onVote, isLoading }) => {
    return (
        <div className="flex gap-3">
            <Button
                size="sm"
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                onClick={() => onVote(true)}
                isLoading={isLoading}
            >
                For
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={() => onVote(false)}
                isLoading={isLoading}
            >
                Against
            </Button>
        </div>
    );
};
