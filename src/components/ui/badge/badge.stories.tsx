import { Badge } from './badge'
import { StoryFn } from '@storybook/react'

export default {
  title: 'Components/Badge',
  component: Badge,
}

const Template: StoryFn<typeof Badge> = (args) => <Badge {...args} />

export const Default = Template.bind({})

Default.args = {
  variant: 'default',
  size: 'default',
  children: 'Let’s Work',
}
