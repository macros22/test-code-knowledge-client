import { authApi } from '@/lib/api/auth.api'
import { useUser } from '@/lib/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

// import {
//   Form,
//   InputGroup,
//   FloatingLabel,
//   Button,
//   Spinner,
// } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsFillLockFill } from 'react-icons/bs'
import { SignInValidationSchema, signInValidationSchema } from './sign-in.validation'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormProvider } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useSignInMutation } from '@/lib/hooks/use-sign-in'

// import { BsFillLockFill, BsFillEnvelopeFill } from 'react-icons/bs';

const SignIn = () => {


  const form = useForm({
    resolver: yupResolver(signInValidationSchema),
  })

  const { mutateUser } = useUser()
  const { trigger, isMutating, ...rest} = useSignInMutation()
  console.log(rest);

  const onSubmit = (data: SignInValidationSchema) => {
 
    trigger(data);

    // if (email && password) {
    //   setIsSubmitLoading(true)
    //   const accessToken = await authApi.signIn({ email, password })
    //   setIsSubmitLoading(false)
    //   mutateUser({ isGuest: false })
    // }
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
            Sign In with Email
          </Button>
    </form>
  </FormProvider>

  )
}

export default SignIn

// ?    <Form onSubmit={handleSubmit}>
//        <div className="relative">
//         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//             </svg>
//         </div>
//         <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
//         <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//     </div>
//       <InputGroup className="mb-3">
//         <InputGroup.Text id="basic-addon1">
//           {/* <BsFillEnvelopeFill /> */}
//         </InputGroup.Text>
//         <FloatingLabel controlId="floatingInput" label="Email">
//           <Form.Control
//             value={email}
//             onChange={handleEmail}
//             type="email"
//             placeholder="Enter email"
//           />
//         </FloatingLabel>
//       </InputGroup>

//       <InputGroup className="mb-3">
//         <InputGroup.Text>
//           <BsFillLockFill />
//         </InputGroup.Text>
//         <FloatingLabel controlId="floatingInput" label="Password">
//           <Form.Control
//             value={password}
//             onChange={handlePassword}
//             type="password"
//             placeholder="Password"
//           />
//         </FloatingLabel>
//       </InputGroup>
//       <Button
//         className=" btn-lg w-100 mb-2"
//         variant="primary"
//         type="submit"
//         disabled={isSubmitLoading}
//       >
//         {isSubmitLoading && (
//           <Spinner
//             as="span"
//             animation="border"
//             size="sm"
//             role="status"
//             aria-hidden="true"
//           />
//         )}
//         {` Sign in`}
//       </Button>

//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         Or you can <Link href="/auth/sign-up">Sign Up</Link>
//       </Form.Group>
//     </Form>