/* eslint-disable */
import { Meta, StoryFn } from '@storybook/react';
import { ToolTip } from '@/shared/components';
import { Button } from '@/components/ui/button';

export default {
  title: 'Components/Tooltip',
  component: ToolTip,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof ToolTip>;

const Template: StoryFn<typeof ToolTip> = (args) => (
  <ToolTip {...args}>
    <Button>Hover me</Button>
  </ToolTip>
);

export const Default = Template.bind({});
Default.args = {
  label: 'This is a tooltip',
};
