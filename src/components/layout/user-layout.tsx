import EditorContent from '~/features/editor/editor-content'
import SidebarNodeBooks from '~/features/notebook/components/sidebar-notebook'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import HeaderNode from '~/features/note/components/header-node'
import SidebarNoteList from '~/features/note/components/sidebar-noteList'
import EditorHeader from '~/features/editor/editor-header'
import { useLayout } from '~/provider/layout-provider'
import { useResponsive } from '~/hooks/use-responsive'

const UserLayout = () => {
  const { isMd } = useResponsive()
  const { isLeftCollapsed, leftPanelRef, setIsLeftCollapsed } = useLayout()
  return (
    <div className='h-screen w-full bg-background text-foreground overflow-hidden flex flex-col md:block'>
      {!isMd && <SidebarNodeBooks />}

      {!isMd && (
        <div className='relative min-h-screen'>
          <div className='absolute inset-0 bg-gray-200 dark:bg-[#1e1e1e] overflow-auto p-3'>
            <EditorContent />
          </div>
        </div>
      )}

      {isMd && (
        <div className='flex h-full w-full'>
          <ResizablePanelGroup
            direction='horizontal'
            className='h-full w-full border-zinc-800'
          >
            {/* === PANEL 1: LEFT SIDEBAR (Notebooks) === */}
            <ResizablePanel
              ref={leftPanelRef}
              defaultSize={20}
              maxSize={30}
              minSize={15}
              collapsible={true}
              collapsedSize={0}
              onCollapse={() => setIsLeftCollapsed(true)}
              onExpand={() => setIsLeftCollapsed(false)}
              className={`bg-background border-r border-border transition-all duration-300 ease-in-out ${
                isLeftCollapsed ? 'min-w-0' : ''
              }`}
            >
              <SidebarNodeBooks />
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className='bg-border hover:bg-primary transition-colors w-px'
            />

            {/* === PANEL 2: MIDDLE SIDEBAR NOTE (List) === */}
            <ResizablePanel
              defaultSize={25}
              minSize={20}
              maxSize={isLeftCollapsed ? 20 : 40}
              className='bg-background border-r border-border flex flex-col min-w-[250px]'
            >
              <HeaderNode />
              <SidebarNoteList />
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className='bg-border hover:bg-primary transition-colors w-px'
            />

            {/* === PANEL 3: MAIN EDITOR === */}
            <ResizablePanel
              defaultSize={55}
              minSize={30}
              className='bg-background flex flex-col min-w-[400px]'
            >
              <EditorHeader />
              <EditorContent />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  )
}

export default UserLayout
