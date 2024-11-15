import Legend from '@/components/Legend'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Legend> = {
    title: 'Components/Legend',
    component: Legend,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Legend title',
        },
        type: {
            control: 'radio',
            options: ['discrete', 'gradient'],
            description: 'Type of legend to display',
        },
        content: {
            control: 'object',
            description: 'Legend content based on type',
        },
    },
} satisfies Meta<typeof Legend>

export default meta
type Story = StoryObj<typeof Legend>

export const DiscreteDefault: Story = {
    args: {
        title: 'Sample Legend',
        type: 'discrete',
        content: [
            { color: '#FF0000', label: 'Red Item' },
            { color: '#00FF00', label: 'Green Item' },
            { color: '#0000FF', label: 'Blue Item' },
        ],
    },
}

export const GradientDefault: Story = {
    args: {
        title: 'Temperature Range',
        type: 'gradient',
        content: {
            stops: [
                { value: 0, color: '#00ff00', label: '0°C' },
                { value: 50, color: '#ffff00', label: '50°C' },
                { value: 100, color: '#ff0000', label: '100°C' },
            ]
        },
    },
}

export const GradientTwoStops: Story = {
    args: {
        title: 'Simple Range',
        type: 'gradient',
        content: {
            stops: [
                { value: 0, color: 'green', label: '0%' },
                { value: 15, color: 'red', label: '15%' }
            ]
        },
    },
}

export const LongDiscreteList: Story = {
    args: {
        title: 'Legend with Many Items',
        type: 'discrete',
        content: [
            { color: '#FF0000', label: 'Red' },
            { color: '#FF7F00', label: 'Orange' },
            { color: '#FFFF00', label: 'Yellow' },
            { color: '#00FF00', label: 'Green' },
            { color: '#0000FF', label: 'Blue' },
            { color: '#4B0082', label: 'Indigo' },
            { color: '#9400D3', label: 'Violet' },
        ],
    },
}

export const CustomColors: Story = {
    args: {
        title: 'Data Categories',
        type: 'discrete',
        content: [
            { color: '#e5f5e0', label: '0-20%' },
            { color: '#a1d99b', label: '21-40%' },
            { color: '#31a354', label: '41-60%' },
            { color: '#006d2c', label: '61-80%' },
        ],
    },
} 