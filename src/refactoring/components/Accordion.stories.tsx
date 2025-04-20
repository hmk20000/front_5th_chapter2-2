import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Click to expand',
    children:
      'This is the content of the accordion. It will be shown when the accordion is expanded.',
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: <h2 style={{ color: 'blue' }}>Custom Styled Title</h2>,
    children: 'This accordion has a custom styled title using JSX.',
  },
};

export const WithTitleProps: Story = {
  args: {
    title: 'Click me with custom props',
    children: 'This accordion has custom title props.',
    titleProps: {
      style: {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
      },
    },
  },
};
