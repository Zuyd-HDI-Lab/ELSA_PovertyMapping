import { Filters } from '@/components/filters'
import type { Meta, StoryObj } from '@storybook/react'


const meta: Meta<typeof Filters> = {
    title: 'Components/Filters',
    component: Filters,
    tags: ['autodocs'],
    parameters: {},
    argTypes: {
        filters: {
            control: 'object',
        },
    },
    args: {},
} satisfies Meta<typeof Filters>
export default meta
type Story = StoryObj<typeof Filters>
export const Default: Story = {
    args: {
        filters: ['Filter 1', 'Filter 2', 'Filter 3'],
    }
}