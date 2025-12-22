import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'
import type { Models } from 'appwrite'
import { Button } from '../ui/button'
import { AlertCircle, FolderOpen, Plus, RefreshCw } from 'lucide-react'

export const LoadingSkeleton = ({ totalLoading }: { totalLoading: number }) => {
  return (
    <div className='space-y-2 px-3'>
      {Array.from({ length: totalLoading }).map((_, index) => {
        return <Skeleton className='h-8 w-full' key={index} />
      })}
    </div>
  )
}

interface PropErrorData {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Models.DefaultDocument[], Error>>
}

export const ErrorData = ({ refetch }: PropErrorData) => {
  return (
    <div className='flex flex-col items-center justify-center space-y-3 px-2 py-6 text-center'>
      <div className='rounded-full bg-destructive/10 p-2'>
        <AlertCircle className='h-5 w-5 text-destructive' />
      </div>
      <div className='space-y-1'>
        <p className='text-sm font-medium'>Error loading list</p>
        <p className='text-xs text-muted-foreground'>Please check connect</p>
      </div>
      <Button
        variant='outline'
        size='sm'
        onClick={() => refetch()}
        className='h-7 text-xs'
      >
        <RefreshCw className='mr-2 h-3 w-3' />
        Refecth
      </Button>
    </div>
  )
}

interface PropEmptyData {
  title?: string
  description?: string
  onCreate?: () => void
}

export const EmptyData = ({
  title = 'No data',
  description = 'There is no data here yet',
  onCreate,
}: PropEmptyData) => {
  return (
    <div className='flex flex-col items-center justify-center space-y-3 px-2 py-6 text-center'>
      <div className='rounded-full bg-muted p-2'>
        <FolderOpen className='h-5 w-5 text-muted-foreground' />
      </div>

      <div className='space-y-1'>
        <p className='text-sm font-medium'>{title}</p>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </div>

      {onCreate && (
        <Button
          variant='ghost'
          size='sm'
          onClick={onCreate}
          className='h-7 text-xs'
        >
          <Plus className='mr-2 h-3 w-3' />
          Create new
        </Button>
      )}
    </div>
  )
}
