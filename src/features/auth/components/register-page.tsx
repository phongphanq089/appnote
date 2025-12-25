import AuthLayout from '~/components/layout/auth-layout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '~/components/shared/form-input'
import { Button } from '~/components/ui/button'
import { Link, useNavigate } from 'react-router'
import { authQuery } from '../auth.query'
import { Spinner } from '~/components/ui/spinner'
import { toast } from 'sonner'
import { RegisterSchema, type RegisterFormValues } from '../auth.schema'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { mutate: register, isPending, error } = authQuery.useRegister()

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = (submitPayload: RegisterFormValues) => {
    register(submitPayload, {
      onSuccess: () => {
        navigate('/login')
        toast.success('Register success')
      },
      onError: (err) => {
        console.error('Registration failed:', err)
      },
    })
  }

  return (
    <AuthLayout
      title='Create an account'
      subtitle='Enter your details to get started with Appwrite'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {error && (
          <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 text-center font-semibold'>
            {error?.message || 'Registration Error'}
          </div>
        )}

        {/* Input Tên */}
        <FormInput
          label='Full Name'
          type='text'
          placeholder='John Doe'
          error={errors.name?.message}
          {...formRegister('name')}
        />

        {/* Input Email */}
        <FormInput
          label='Email'
          type='email'
          placeholder='name@example.com'
          error={errors.email?.message}
          {...formRegister('email')}
        />

        {/* Input Mật khẩu */}
        <FormInput
          label='Password'
          type='password'
          error={errors.password?.message}
          {...formRegister('password')}
        />

        {/* Input Nhập lại mật khẩu */}
        <FormInput
          label='Confirm Password'
          type='password'
          error={errors.confirmPassword?.message}
          {...formRegister('confirmPassword')}
        />

        <Button
          type='submit'
          className='w-full min-h-10 mt-5'
          disabled={isPending}
        >
          {isPending ? <Spinner className='size-6 text-white' /> : ''}
          Create Account
        </Button>
      </form>

      <div className='mt-4 text-center text-sm'>
        Already have an account?
        <Link
          to='/login'
          className='font-medium text-primary hover:underline ml-1'
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage
