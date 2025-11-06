import { useState, useEffect } from 'react'
import './ScrollIndicator.css'

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-indicator">
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

export default ScrollIndicator