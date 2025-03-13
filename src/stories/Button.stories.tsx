/* eslint-disable */

import { Meta, StoryFn } from '@storybook/react';
import { Button } from '@/shared/components';

import { FiPlus } from 'react-icons/fi';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'disabled'],
    },
    icon: { control: 'boolean' },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'disabled',
  children: 'Disabled Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'primary',
  children: 'With Icon',
  icon: <FiPlus />,
};
