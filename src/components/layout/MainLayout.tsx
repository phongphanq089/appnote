import NoteEditor from '~/features/note/components/NoteEditor'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import NoteList from '~/features/note/components/NoteList'
import { useResponsive } from '~/hooks/useResponsive'

const MainLayout = () => {
  const { isMd } = useResponsive()
  return (
    <ResizablePanelGroup
      direction={isMd ? 'horizontal' : 'vertical'}
      className='rounded-lg border w-full bg-muted/50'
    >
      <ResizablePanel defaultSize={20}>
        <NoteList />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <NoteEditor />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default MainLayout
