import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Get started'
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled'
  }
};
