import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  useCreateNotebook,
  useDeleteNotebook,
  useUpdateNotebook,
} from '../notebook.query'
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

interface ModalActionProps {
  mode: 'create' | 'edit'
  initialData?: {
    id: string
    title: string
  }
  userCtx?: {
    userId: string
    email: string
  }
  trigger?: React.ReactNode
}

const ModalAction = ({
  mode,
  initialData,
  userCtx,
  trigger,
}: ModalActionProps) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  const createNotebook = useCreateNotebook()
  const updateNotebook = useUpdateNotebook()

  const navigate = useNavigate()

  const deleteNotebook = useDeleteNotebook()

  const isPending = createNotebook.isPending || updateNotebook.isPending

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title)
      } else {
        setTitle('')
      }
    }
  }, [open, mode, initialData])

  const handleDelete = async (id: string) => {
    deleteNotebook.mutate(id, {
      onSuccess: () => {
        toast.success('Deleted notebook successfully')
        navigate('/')
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const onSuccess = () => {
      setOpen(false)
      setTitle('')
      toast.success('Successfully')
    }

    if (mode === 'create') {
      if (!userCtx) {
        toast.error('Missing user context for create action')
        return
      }

      createNotebook.mutate(
        {
          title,
          userId: userCtx.userId,
          email: userCtx.email,
        },
        { onSuccess }
      )
    }

    if (mode === 'edit' && initialData) {
      updateNotebook.mutate(
        {
          notebookId: initialData.id,
          title: title,
        },
        { onSuccess }
      )
    }
  }

  const config = {
    create: {
      title: 'Create Notebook',
      btnSubmit: 'Create',
      description: 'Add a new notebook to your collection.',
    },
    edit: {
      title: 'Edit Notebook',
      btnSubmit: 'Save Changes',
      description: 'Update your notebook details.',
    },
  }

  const currentConfig = config[mode]
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant={mode === 'create' ? 'default' : 'ghost'} size='sm'>
            {mode === 'create' ? (
              <Plus className='w-4 h-4 mr-2' />
            ) : (
              <Pencil className='w-4 h-4' />
            )}
            {mode === 'create' ? 'New Notebook' : 'Edit'}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{currentConfig.title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
          <div className='grid gap-3'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Ex: Work, Personal, Ideas...'
              disabled={isPending}
              autoFocus
            />
          </div>

          <DialogFooter>
            {mode === 'edit' ? (
              <Button
                type='button'
                onClick={() => handleDelete(initialData?.id as string)}
                disabled={deleteNotebook.isPending}
                variant={'destructive'}
              >
                {deleteNotebook.isPending ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Trash2 />
                )}
              </Button>
            ) : (
              <DialogClose asChild>
                <Button type='button' variant='outline' disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
            )}

            <Button type='submit' disabled={isPending || !title.trim()}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {currentConfig.btnSubmit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAction
