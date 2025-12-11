import 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import ReactQueryProvider from './provider/react-query-provider.tsx'
import { ThemeProvider } from './provider/theme-provider.tsx'
import LayoutProvider from './provider/layout-provider.tsx'
import ToasterCustom from './components/shared/toaster-custom.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <LayoutProvider>
            <ToasterCustom />
            <App />
          </LayoutProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </StrictMode>
)
