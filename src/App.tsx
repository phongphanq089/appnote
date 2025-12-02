import { ThemeProvider } from './provider/theme-provider'
import LayoutProvider from './provider/layout-provider'
import MainLayout from './components/layout/main-layout'
function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <LayoutProvider>
        <MainLayout />
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default App
