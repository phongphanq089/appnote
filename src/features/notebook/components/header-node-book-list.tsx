import { Button } from '~/components/ui/button'

export function HeaderNodeBookList({
  icon,
  label,
  count,
  active,
}: {
  icon: React.ReactNode
  label: string
  count?: number
  active?: boolean
}) {
  return (
    <Button
      variant='ghost'
      className={`w-full justify-start h-8 px-2 text-sm font-normal ${
        active
          ? 'bg-blue-600/20 text-blue-400 font-bold'
          : 'dark:text-zinc-400 hover:dark:text-zinc-100 hover:dark:bg-zinc-800 hover:bg-gray-200'
      }`}
    >
      <span className='mr-2 opacity-100'>{icon}</span>
      <span className='flex-1 text-left truncate'>{label}</span>
      {count !== undefined && (
        <span className='ml-auto text-xs opacity-100 font-bold'>{count} </span>
      )}
    </Button>
  )
}
