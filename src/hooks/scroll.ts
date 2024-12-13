export const smoothScrollToTop = () => {
    const startY = window.scrollY // Vị trí hiện tại
    const duration = 500 // Thời gian cuộn (ms)
    const startTime = performance.now() // Lấy thời gian bắt đầu
  
    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime // Thời gian đã trôi qua
      const progress = Math.min(elapsed / duration, 1) // Tiến độ cuộn (giới hạn trong khoảng [0, 1])
  
      const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2) // Hàm easing (mượt)
  
      const nextY = startY * (1 - easeInOutQuad(progress)) // Tính vị trí tiếp theo
      window.scrollTo(0, nextY) // Cuộn đến vị trí tiếp theo
  
      if (progress < 1) {
        requestAnimationFrame(scroll) // Tiếp tục cuộn
      }
    }
  
    requestAnimationFrame(scroll) // Bắt đầu cuộn
  }