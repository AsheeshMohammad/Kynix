import { useState, useEffect } from 'react'
import './OurWork.css'

// FoodZCorner images
import foodz1 from '../assets/foodzcorner/image1.png'
import foodz2 from '../assets/foodzcorner/image2.png'
import foodz3 from '../assets/foodzcorner/image3.png'
import foodz4 from '../assets/foodzcorner/image4.png'
import foodzLogo from '../assets/foodzcorner/logo.svg'

// PetzCare images
import petz1 from '../assets/petzcare/image1.png'
import petz2 from '../assets/petzcare/image2.png'
import petz3 from '../assets/petzcare/image3.png'
import petz4 from '../assets/petzcare/image4.png'
import petzLogo from '../assets/petzcare/PetzCareLogo.svg'

const OurWork = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const projects = [
    {
      id: 1,
      title: 'FoodZCorner',
      category: 'Web Development',
      tags: ['React', 'Node.js'],
      description: 'A comprehensive food business website with modern design, menu management, and responsive layout for optimal user experience.',
      url: 'https://foodzcorner.onrender.com/',
      images: [foodz1, foodz2, foodz3, foodz4],
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)'
    },
    {
      id: 2,
      title: 'PetzCare',
      category: 'Web Development',
      tags: ['React', 'Node.js'],
      description: 'Professional pet care business website featuring service listings, appointment booking, and user-friendly interface for pet owners.',
      url: 'https://petzcare.onrender.com/',
      images: [petz1, petz2, petz3, petz4],
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)'
    }
  ]

  useEffect(() => {
    const intervals = {}
    projects.forEach(project => {
      intervals[project.id] = setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [project.id]: ((prev[project.id] || 0) + 1) % project.images.length
        }))
      }, 3000)
    })

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval))
    }
  }, [])

  return (
    <section className="our-work">
      <div className="container">
        <div className="work-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <div className="project-info">
                  <span className="case-study">CASE STUDY</span>
                  <div className="project-logo">
                    {project.id === 1 ? (
                      <img src={foodzLogo} alt="FoodZCorner" className="project-title-logo" />
                    ) : (
                      <img src={petzLogo} alt="PetzCare" className="project-title-logo" />
                    )}
                  </div>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p>{project.description}</p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="see-case-study">
                    VIEW WEBSITE ↗
                  </a>
                </div>
                <div className="project-visual">
                  <div className="project-image">
                    <img 
                      src={project.images[currentImageIndex[project.id] || 0]} 
                      alt={`${project.title} screenshot`}
                      className="project-screenshot"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurWork