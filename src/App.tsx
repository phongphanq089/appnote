import { ThemeProvider } from './provider/ThemeProvider'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from './components/ui/sidebar'
import { AppSidebar } from './components/layout/AppSidebar'
import { Separator } from './components/ui/separator'
import MainLayout from './components/layout/MainLayout'
import BreadcrumbLayout from './components/layout/BreadcrumbLayout'
import { AnimatedThemeToggler } from './components/shared/AnimatedThemeToggler'
function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 justify-between items-center gap-2 px-4'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
              <BreadcrumbLayout />
            </div>
            <AnimatedThemeToggler />
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
            <MainLayout />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
