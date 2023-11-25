import { useUser } from '@/lib/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormProvider } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { SignUpValidationSchema, signUpValidationSchema } from './sign-up-form.validation'
import { useSignUpMutation } from '@/lib/hooks/auth/use-sign-up.mutation'

const SignUpForm = () => {
  const form = useForm({
    resolver: yupResolver(signUpValidationSchema),
  })

  const { mutateUser } = useUser()
  const { trigger, isMutating } = useSignUpMutation()

  const onSubmit = (data: SignUpValidationSchema) => {
    trigger(data);
    // mutateUser({ isGuest: false });
  }

  return (
    <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder={field.name} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder={field.name} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder={field.name} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button disabled={isMutating}>
            {isMutating && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
    </form>
  </FormProvider>

  )
}

export default SignUpForm