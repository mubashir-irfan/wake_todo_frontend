/* eslint-disable */

import { Meta, StoryFn } from '@storybook/react';
import { Icon } from '@/shared/components';
import { FaStar, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    className: { control: 'text' },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => <Icon {...args} />;

export const StarIcon = Template.bind({});
StarIcon.args = {
  icon: <FaStar className="text-yellow-500 text-2xl" />,
};

export const CheckIcon = Template.bind({});
CheckIcon.args = {
  icon: <FaCheckCircle className="text-green-500 text-2xl" />,
};

export const WarningIcon = Template.bind({});
WarningIcon.args = {
  icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
};
