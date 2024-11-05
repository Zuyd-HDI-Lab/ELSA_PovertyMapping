import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Adjust the import path as necessary
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Card> = {
    title: 'Components/ui/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Empty: Story = {
    render: () => (
        <Card>
            <CardHeader>
                <CardTitle>No Content</CardTitle>
                <CardDescription>This card has no content.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>There is currently no additional information.</p>
            </CardContent>
            <CardFooter>
                <Button>No Action</Button>
            </CardFooter>
        </Card>
    ),
};

export const WithTitleAndDescription: Story = {
    render: () => (
        <Card>
            <CardHeader>
                <CardTitle>Sample Card Title</CardTitle>
                <CardDescription>This is a sample description of the card.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is the main content area of the card, where you can include more information.</p>
            </CardContent>
            <CardFooter>
                <Button>Action</Button>
            </CardFooter>
        </Card>
    ),
};

export const WithMultipleItems: Story = {
    render: () => (
        <Card>
            <CardHeader>
                <CardTitle>Multiple Items Card</CardTitle>
                <CardDescription>This card contains a list of items.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button>View More</Button>
            </CardFooter>
        </Card>
    ),
};
