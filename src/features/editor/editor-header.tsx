import { MoreHorizontal } from 'lucide-react'
import { AnimatedThemeToggler } from '~/components/shared/animated-theme-toggler'
import { Button } from '~/components/ui/button'

const EditorHeader = () => {
  return (
    <header className='h-12 flex items-center justify-between px-4 border-b dark:border-zinc-800 bg-accent dark:bg-[#1e1e1e] flex-none'>
      <div className='flex items-center gap-2 overflow-hidden'>
        <span className='text-zinc-400 text-sm'>@tanstack/react-query</span>
      </div>
      <div className='flex items-center gap-2 text-zinc-400'>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 hover:text-white'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}

export default EditorHeader
