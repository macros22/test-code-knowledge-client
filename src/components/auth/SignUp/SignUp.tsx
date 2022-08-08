import Link from 'next/link'
import React from 'react'
// import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export const SignUp = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 550 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Sign up
      </Header>
      <Form size='large'>
        <Segment >
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Your name' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        Or you can <Link href='/auth/sign-in'>Sign In</Link> 
      </Message>
    </Grid.Column>
  </Grid>
)
