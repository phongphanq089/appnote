import { Folder } from 'lucide-react'

import { HeaderNodeBookList } from '~/features/notebook/components/header-node-book-list'

const NoteBookList = () => {
  return (
    <div className='space-y-0.5'>
      {notebooks.map((notebook) => (
        <HeaderNodeBookList
          key={notebook.id}
          icon={
            <Folder
              className={`h-4 w-4 ${notebook.color}`}
              fill='currentColor'
              fillOpacity={0.2}
            />
          }
          label={notebook.name}
          count={notebook.count}
          active={notebook.active}
        />
      ))}
    </div>
  )
}

export default NoteBookList

const notebooks = [
  { id: 1, name: 'FASTIFY', count: 1, color: 'text-yellow-500' },
  { id: 2, name: 'ghi chú nháp', count: 5, color: 'text-purple-500' },
  { id: 8, name: 'TanStack', count: 2, color: 'text-blue-500', active: true },
  { id: 9, name: 'TEMPLATE UI', count: 3, color: 'text-orange-400' },
]
