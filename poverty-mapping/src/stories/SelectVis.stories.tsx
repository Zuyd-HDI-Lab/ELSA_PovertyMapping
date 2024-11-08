import { SelectVis } from '@/components/selectvis'
import type { Meta, StoryObj } from '@storybook/react'


const meta: Meta<typeof SelectVis> = {
    title: 'Components/SelectVis',
    component: SelectVis,
    tags: ['autodocs'],
    parameters: {},
    argTypes: {
        options: {
            control: 'object',
        },
    },
    args: {},
} satisfies Meta<typeof SelectVis>
export default meta
type Story = StoryObj<typeof SelectVis>
export const Default: Story = {
    args: {
        options: ['Option 1', 'Option 2', 'Option 3'],
        onChange: (option: string) => {
            console.log('Selected option:', option);
        },
    }
}