/* eslint-disable */

import { Meta, StoryFn } from '@storybook/react';
import { CountBadge } from '@/shared/components';

export default {
  title: 'Components/CountBadge',
  component: CountBadge,
  argTypes: {
    title: { control: 'text' },
    count: { control: 'number' },
    bgColor: { control: 'text' },
    textColor: { control: 'text' },
    className: { control: 'text' },
  },
} as Meta<typeof CountBadge>;

const Template: StoryFn<typeof CountBadge> = (args) => <CountBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Notifications',
  count: 5,
};

export const HighCount = Template.bind({});
HighCount.args = {
  title: 'Messages',
  count: 12,
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  title: 'Tasks',
  count: 3,
  bgColor: 'bg-red-500',
  textColor: 'text-black',
};
