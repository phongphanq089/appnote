import { ScrollArea } from '~/components/ui/scroll-area'
import NoteListHeader from './NoteListHeader'

const NoteList = () => {
  return (
    <>
      <NoteListHeader />
      <ScrollArea className='h-[90vh] space-y-3'>
        <div className='p-3 space-y-3'>
          <AccentBoxes />
        </div>
      </ScrollArea>
    </>
  )
}

export default NoteList

const AccentBoxes = () => {
  const list = Array.from({ length: 50 })
  return (
    <>
      {list.map((_, index) => (
        <div key={index} className='bg-accent p-3 rounded-2xl'></div>
      ))}
    </>
  )
}
