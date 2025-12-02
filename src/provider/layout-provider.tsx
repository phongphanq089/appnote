import React, {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { ImperativePanelHandle } from 'react-resizable-panels'

interface LayoutProviderType {
  isLeftCollapsed: boolean
  setIsLeftCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  leftPanelRef: React.RefObject<ImperativePanelHandle | null>
  toggleLeftSidebar: () => void
}

const LayoutContext = createContext<LayoutProviderType | undefined>(undefined)

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const leftPanelRef = useRef<ImperativePanelHandle>(null)
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false)

  const toggleLeftSidebar = () => {
    const panel = leftPanelRef.current
    if (panel) {
      if (isLeftCollapsed) {
        panel.expand()
      } else {
        panel.collapse()
      }

      setIsLeftCollapsed(!isLeftCollapsed)
    }
  }

  const value = {
    isLeftCollapsed,
    setIsLeftCollapsed,
    leftPanelRef,
    toggleLeftSidebar,
  }
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export default LayoutProvider

export function useLayout() {
  const context = useContext(LayoutContext)

  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }

  return context
}
