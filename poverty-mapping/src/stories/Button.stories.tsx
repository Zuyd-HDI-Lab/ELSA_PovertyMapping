import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Button> = {
    title: 'Components/ui/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            control: 'select',
        },
        size: {
            options: ['default', 'sm', 'lg', 'icon'],
            control: 'select',
        },
    },
    args: { },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof Button>
export const Default: Story = {
    args: {
        variant: 'default',
        size: 'default',
        disabled: false,
        onClick: action('default onClick'),
        children: 'Button',
    },
}

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        size: 'default',
        disabled: false,
        onClick: action('default onClick'),
        children: 'Button',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        size: 'default',
        disabled: false,
        onClick: action('default onClick'),
        children: 'Button',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'default',
        disabled: false,
        onClick: action('default onClick'),
        children: 'Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        size: 'default',
        disabled: false,
        onClick: action('default onClick'),
        children: 'Button',
    },
}

export const Link: Story = {
    args: {
        variant: 'link',
        size: 'default',
        disabled: false,
        onClick: action('default onClick'),
        children: 'Button',
    },
}