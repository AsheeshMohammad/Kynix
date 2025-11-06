import { useState } from 'react'
import './Header.css'
// import logo from '../assets/logo1.png'
import logo from '../assets/logo2.png'
// import logo from '../assets/logo3.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="Your Agency" className="logo-image" />
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a>
            <a href="#work" onClick={(e) => handleSmoothScroll(e, 'work')}>Work</a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
          </nav>

          <div className="header-actions">
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">LINKEDIN ↗</a>
              <a href="#" aria-label="Twitter">TWITTER ↗</a>
              <a href="#" aria-label="Dribbble">DRIBBBLE ↗</a>
            </div>
            <button className="cta-button">LET'S TALK ↗</button>
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header