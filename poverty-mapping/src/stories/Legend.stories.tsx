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
        content: {
            control: 'object',
            description: 'Legend content including title and items',
        },
    },
} satisfies Meta<typeof Legend>

export default meta
type Story = StoryObj<typeof Legend>

export const Default: Story = {
    args: {
        content: {
            title: 'Sample Legend',
            items: [
                { color: '#FF0000', label: 'Red Item' },
                { color: '#00FF00', label: 'Green Item' },
                { color: '#0000FF', label: 'Blue Item' },
            ],
        },
    },
}

export const Empty: Story = {
    args: {
        content: null,
    },
}

export const LongList: Story = {
    args: {
        content: {
            title: 'Legend with Many Items',
            items: [
                { color: '#FF0000', label: 'Red' },
                { color: '#FF7F00', label: 'Orange' },
                { color: '#FFFF00', label: 'Yellow' },
                { color: '#00FF00', label: 'Green' },
                { color: '#0000FF', label: 'Blue' },
                { color: '#4B0082', label: 'Indigo' },
                { color: '#9400D3', label: 'Violet' },
            ],
        },
    },
}

export const CustomColors: Story = {
    args: {
        content: {
            title: 'Data Categories',
            items: [
                { color: '#e5f5e0', label: '0-20%' },
                { color: '#a1d99b', label: '21-40%' },
                { color: '#31a354', label: '41-60%' },
                { color: '#006d2c', label: '61-80%' },
            ],
        },
    },
} 