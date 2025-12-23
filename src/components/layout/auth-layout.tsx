import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4 bg-accent relative'>
      {/* Background gradient */}
      <div
        className='
          absolute inset-0 z-0 h-full w-full
          bg-white
          [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]

          dark:bg-slate-950
          dark:[background:radial-gradient(125%_125%_at_50%_10%,#1e1b4b_0%,#000_80%)]
        '
      ></div>

      {/* Card */}
      <div
        className='
          w-full max-w-[500px] space-y-6 rounded-2xl border
          bg-background p-8 shadow-lg relative z-10

          dark:bg-slate-900 dark:border-slate-700 dark:shadow-xl
        '
      >
        {/* Title + subtitle */}
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight uppercase dark:text-slate-200'>
            {title}
          </h1>
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}

export default AuthLayout
