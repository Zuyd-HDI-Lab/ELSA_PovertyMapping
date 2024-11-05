import { Input } from '@/components/ui/input';
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Input> = {
    title: 'Components/ui/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
    },
    args: { },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof Input>
export const Default: Story = {
    args: {
        type: 'text',
        onChange: action('default onChange'),
        placeholder: 'Input',
    },
}
