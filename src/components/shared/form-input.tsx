import { forwardRef } from 'react'
import { cn } from '~/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-slate-700 dark:text-slate-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          {label}
        </label>

        <input
          ref={ref}
          autoComplete='off'
          className={cn(
            'flex h-11 w-full rounded-lg border-2 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm transition-all duration-200',

            // Placeholder
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',

            // File input reset
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',

            // Focus
            'focus:outline-none focus:scale-[1.01]',

            // Disabled
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-700',

            // Error styles
            error
              ? 'border-red-400 focus:border-red-500 focus:shadow-red-200 dark:border-red-500 dark:focus:border-red-400 dark:focus:shadow-red-900/40'
              : 'border-slate-300 focus:border-primary focus:shadow-blue-100 dark:border-slate-600 dark:focus:border-primary dark:focus:shadow-blue-900/40',

            className
          )}
          {...props}
        />

        {error && (
          <span className='text-xs font-medium text-red-500 dark:text-red-400 flex items-center gap-1'>
            <svg
              className='w-3.5 h-3.5'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            {error}
          </span>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
