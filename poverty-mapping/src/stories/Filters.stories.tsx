import { Filters } from '@/components/filters'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { useState } from 'react'

const meta: Meta<typeof Filters> = {
    title: 'Components/Filters',
    component: Filters,
    tags: ['autodocs'],
    parameters: {},
    argTypes: {
        filters: {
            control: 'object',
            description: 'Array of filter objects with value and label properties',
        },
    },
} satisfies Meta<typeof Filters>

export default meta
type Story = StoryObj<typeof Filters>

const FiltersWithState = ({ filters }: { filters: Array<{ value: string, label: string }> }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([filters[0]?.value])

    const handleChange = (filter: string, checked: boolean) => {
        setSelectedFilters(prev => 
            checked 
                ? [...prev, filter]
                : prev.filter(f => f !== filter)
        )
        action('onChange')(filter, checked)
    }

    return (
        <Filters
            filters={filters}
            selectedFilters={selectedFilters}
            onChange={handleChange}
        />
    )
}

export const Default: Story = {
    args: {
        filters: [
            { value: 'filter1', label: 'Filter 1' },
            { value: 'filter2', label: 'Filter 2' },
            { value: 'filter3', label: 'Filter 3' },
        ],
    },
    render: ({ filters }) => <FiltersWithState filters={filters} />
}