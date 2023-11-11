import { Button } from './button'
import { StoryFn } from '@storybook/react'

export default {
  title: 'Components/Button',
  component: Button,
}

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})

Default.args = {
  variant: 'outlined',
  children: 'Let’s Work',
}
