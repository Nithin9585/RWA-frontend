import type { Meta, StoryObj } from '@storybook/react';
import { StrategyBadge } from './StrategyBadge';

const meta = {
  title: 'Garden/StrategyBadge',
  component: StrategyBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    strategy: {
      control: 'select',
      options: [0, 1, 2],
      mapping: {
        0: 'Conservative',
        1: 'Balanced',
        2: 'Aggressive',
      },
    },
  },
} satisfies Meta<typeof StrategyBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Conservative: Story = {
  args: {
    strategy: 0,
  },
};

export const Balanced: Story = {
  args: {
    strategy: 1,
  },
};

export const Aggressive: Story = {
  args: {
    strategy: 2,
  },
};
