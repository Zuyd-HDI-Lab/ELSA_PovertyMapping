import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton
} from '@/components/ui/select'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Select> = {
    title: 'Components/ui/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    // argTypes: {},
    // args: {},
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof Select>
export const Empty: Story = {};

export const OneItem: Story = {
    render: (args) => (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Placeholder" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Items</SelectLabel>
                    <SelectItem value="Select Item 1">Apple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    ),
}

export const ManyItems: Story = {
    render: (args) => (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Placeholder" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Items</SelectLabel>
                    <SelectItem value="Select Item 1">Apple</SelectItem>
                    <SelectItem value="Select Item 2">Banana</SelectItem>
                    <SelectItem value="Select Item 3">Blueberry</SelectItem>
                    <SelectItem value="Select Item 4">Grapes</SelectItem>
                    <SelectItem value="Select Item 5">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    ),
}