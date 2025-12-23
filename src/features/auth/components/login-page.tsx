import AuthLayout from '~/components/layout/auth-layout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginFormValues } from '../auth.schema'
import { FormInput } from '~/components/shared/form-input'
import { Button } from '~/components/ui/button'
import { Link, useNavigate } from 'react-router'
import { authQuery } from '../auth.query'
import { Spinner } from '~/components/ui/spinner'
import { useAuthStore } from '~/store/use-auth-store'

const LoginPage = () => {
  const navigate = useNavigate()
  const { mutate: login, isPending, error } = authQuery.useLogin()
  const { setUser } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (submitPayload: LoginFormValues) => {
    login(submitPayload, {
      onSuccess: (user) => {
        setUser(user)
        navigate('/')
      },
      onError: () => {
        console.error('Login failed:', error)
      },
    })
  }

  return (
    <AuthLayout
      title='Well come back'
      subtitle='Enter your email and password to access your workspace'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {error && (
          <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 text-center font-semibold'>
            {error?.message || 'Login Error'}
          </div>
        )}

        <FormInput
          label='Email'
          type='email'
          error={errors.email?.message}
          {...register('email')}
        />

        <FormInput
          label='Mật khẩu'
          type='password'
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type='submit'
          className='w-full min-h-10 mt-5'
          disabled={isPending}
        >
          {isPending ? <Spinner className='size-6 text-white' /> : ''}
          Login
        </Button>
      </form>
      <div className='mt-4 text-center text-sm'>
        Don't have an account?
        <Link
          to='/register'
          className='font-medium text-primary hover:underline ml-1'
        >
          Register now
        </Link>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
