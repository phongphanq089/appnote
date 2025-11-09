import { useState, useEffect } from 'react'

// 1. Định nghĩa các breakpoint (giống Tailwind)
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// 2. Định nghĩa kiểu trả về của hook
interface ResponsiveState {
  /** Chiều rộng hiện tại của màn hình */
  width: number
  /** True nếu màn hình >= 640px */
  isSm: boolean
  /** True nếu màn hình >= 768px */
  isMd: boolean
  /** True nếu màn hình >= 1024px */
  isLg: boolean
  /** True nếu màn hình >= 1280px */
  isXl: boolean
  /** True nếu màn hình >= 1536px */
  is2xl: boolean
}

/**
 * Một helper function để lấy state dựa trên chiều rộng
 * @param width Chiều rộng màn hình (window.innerWidth)
 * @returns {ResponsiveState} Trạng thái responsive
 */
const getState = (width: number): ResponsiveState => ({
  width,
  isSm: width >= BREAKPOINTS.sm,
  isMd: width >= BREAKPOINTS.md,
  isLg: width >= BREAKPOINTS.lg,
  isXl: width >= BREAKPOINTS.xl,
  is2xl: width >= BREAKPOINTS['2xl'],
})

/**
 * Hook theo dõi kích thước màn hình và trả về các breakpoint hiện tại.
 * Hoạt động theo nguyên tắc mobile-first (giống Tailwind CSS).
 * @example
 * const { isMd, isLg } = useResponsive();
 *
 * if (isLg) return <DesktopComponent />;
 * if (isMd) return <TabletComponent />;
 * return <MobileComponent />;
 */
export const useResponsive = (): ResponsiveState => {
  // 3. Khởi tạo state (an toàn cho Server-Side Rendering)
  // Đặt width = 0 để tất cả boolean là 'false' ở phía server
  const [state, setState] = useState<ResponsiveState>(getState(0))

  useEffect(() => {
    // 4. Hàm xử lý khi resize
    const handleResize = () => {
      setState(getState(window.innerWidth))
    }

    // 5. Set state lần đầu khi component mount ở client
    // (Lúc này window.innerWidth đã tồn tại)
    handleResize()

    // 6. Thêm event listener
    window.addEventListener('resize', handleResize)

    // 7. Cleanup: Gỡ bỏ event listener khi component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, []) // [] đảm bảo effect này chỉ chạy 1 lần khi mount

  return state
}
