import { Slider } from '@/components/ui/slider'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Slider> = {
    title: 'Components/ui/Slider',
    component: Slider,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        defaultValue: {
            control: 'number',
        },
        max: {
            control: 'number',
        },
        step: {
            control: 'number',
        },
        disabled: {
            control: 'boolean',
        },
        className: {
            control: 'text',
        },
    },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
    args: {
        defaultValue: [33],
        max: 100,
        step: 1,
        disabled: false,
        className: '',
    },
};

export const Disabled: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        step: 1,
        disabled: true,
        className: '',
    },
};

export const CustomClass: Story = {
    args: {
        defaultValue: [70],
        max: 100,
        step: 1,
        disabled: false,
        className: 'bg-red-500',
    },
};