import { SearchBar } from '@/components/searchbar';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SearchBar> = {
    title: 'Components/SearchBar',
    component: SearchBar,
    tags: ['autodocs'],
    parameters: {
    },
    argTypes: {
        placeholder: {
            control: 'text',
        },
    },
    args: {},
} satisfies Meta<typeof SearchBar>;
export default meta;
type Story = StoryObj<typeof SearchBar>;
export const Default: Story = {
    args: {
        placeholder: 'Search...',
        onSearch: action('onSearch'),
    },
};