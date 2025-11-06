import './OurWork.css'

const OurWork = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web design',
      tags: ['React', 'Node.js'],
      description: 'Modern e-commerce platform with advanced filtering, payment integration, and responsive design for optimal user experience.',
      image: '/api/placeholder/400/300',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'App Development',
      tags: ['React Native', 'Firebase'],
      description: 'Secure mobile banking application with biometric authentication, real-time transactions, and intuitive user interface.',
      image: '/api/placeholder/400/300',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ]

  return (
    <section className="our-work">
      <div className="container">
        <div className="work-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <div className="project-info">
                  <span className="case-study">CASE STUDY</span>
                  <h3>{project.title}</h3>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p>{project.description}</p>
                  <button className="see-case-study">
                    SEE CASE STUDY ↗
                  </button>
                </div>
                <div className="project-visual">
                  <div 
                    className="project-image"
                    style={{ background: project.gradient }}
                  >
                    <div className="image-overlay"></div>
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