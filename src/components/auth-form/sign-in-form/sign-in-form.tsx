import { authApi } from '@/lib/api/auth.api'
import { useUser } from '@/lib/hooks'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { SignInValidationSchema, signInValidationSchema } from './sign-in-form.validation'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormProvider } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useSignInMutation } from '@/lib/hooks/auth/use-sign-in.mutation'

const SignInForm = () => {
  const form = useForm({
    resolver: yupResolver(signInValidationSchema),
  })

  const { mutateUser } = useUser()
  const { trigger, isMutating } = useSignInMutation()

  const onSubmit = (data: SignInValidationSchema) => {
    trigger(data);
    mutateUser({ isGuest: false });
  }

  return (
    <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
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
            Sign In
          </Button>
    </form>
  </FormProvider>

  )
}

export default SignInForm
