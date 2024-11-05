import { Checkbox } from '@/components/ui/checkbox'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'


const meta: Meta<typeof Checkbox> = {
    title: 'Components/ui/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof Checkbox>
export const Default: Story = {
    args: {
        id: 'id',
        disabled: false,
        defaultChecked: false,
        onCheckedChange: action('onCheckedChange'),
    },
}
export const Disabled: Story = {
    args: {
        id: 'id',
        disabled: true,
        defaultChecked: false,
        onCheckedChange: action('onCheckedChange'),
    },
}
