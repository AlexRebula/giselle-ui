import type { Meta, StoryObj } from '@storybook/react';
import { Button, ThemeProvider, useTheme } from '../src';

const meta: Meta = {
  title: 'Foundations/ThemeProvider',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

function ThemeExample() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div className="giselle-root" style={{ minHeight: 220, padding: 24 }}>
      <p style={{ marginBottom: 12 }}>
        Theme: <strong>{theme}</strong> (resolved: <strong>{resolvedTheme}</strong>)
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => setTheme('light')}>Light</Button>
        <Button onClick={() => setTheme('dark')}>Dark</Button>
        <Button onClick={() => setTheme('system')}>System</Button>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeExample />
    </ThemeProvider>
  )
};
