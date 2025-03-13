/* eslint-disable */
import { Meta, StoryFn } from '@storybook/react';
import { Modal } from '@/shared/components';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    isOpen: { control: 'boolean' },
  },
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  description: 'This is a description of the modal.',
  isOpen: false,
  primaryButton: <Button>Confirm</Button>,
  secondaryButton: <Button variant="secondary">Cancel</Button>,
  children: <p>Modal Content Goes Here</p>,
};
