import { Feather } from 'lucide-react'

const SplashScreen = () => {
  return (
    <div className='fixed inset-0 z-9000 flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-500 animate-in fade-in'>
      <div className='flex flex-col items-center gap-6'>
        <div className='relative flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 shadow-lg ring-1 ring-black/5 dark:ring-white/10'>
          <Feather
            className='h-12 w-12 text-primary animate-pulse'
            strokeWidth={1.5}
          />
        </div>
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            MyNote App
          </h1>
          <p className='text-sm text-muted-foreground animate-pulse'>
            Synchronizing workspace...
          </p>
        </div>
        <div className='h-1.5 w-48 overflow-hidden rounded-full bg-secondary'>
          <div className='h-full w-full origin-left-right animate-progress bg-primary'></div>
        </div>
      </div>

      <div className='absolute bottom-8 text-xs text-muted-foreground/50'>
        © 2024 Your Company
      </div>
    </div>
  )
}

export default SplashScreen
