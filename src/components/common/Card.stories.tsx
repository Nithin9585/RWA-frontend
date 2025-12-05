import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
    title: 'Common/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'glass'],
        },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
    args: {
        variant: 'glass',
        children: (
            <div className="text-white">
                <h3 className="text-lg font-bold mb-2">Glass Card</h3>
                <p className="text-gray-300">This is a glassmorphism card component.</p>
            </div>
        ),
        className: 'w-80',
    },
};

export const Default: Story = {
    args: {
        variant: 'default',
        children: (
            <div>
                <h3 className="text-lg font-bold mb-2">Default Card</h3>
                <p>This is a default card component.</p>
            </div>
        ),
        className: 'w-80',
    },
};
