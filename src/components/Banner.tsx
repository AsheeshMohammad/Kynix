import './Banner.css'
import stock1 from '../assets/stock1.mp4'

const Banner = () => {
  return (
    <section className="banner">
      <div className="container">
        <div className="banner-content">
          <video autoPlay loop muted playsInline className="banner-video">
            <source src={stock1} type="video/mp4" />
          </video>
          <div className="banner-text">
            <h1>
              We create <span className="highlight">beautiful</span><br />
              experiences
            </h1>
            <p>
              We work with people all over the world to create<br />
              tailor-made web and mobile app experiences
            </p>
            <div className="availability">
              Available for freelance work
            </div>
          </div>

        </div>

        <div className="services-grid">
          <div className="service-card development">
            <h3>Development</h3>
            <p>
              We specialize in developing websites and mobile apps using modern technologies 
              that deliver exceptional user experiences. Our team creates responsive, 
              fast-loading, and SEO-optimized solutions.
            </p>
            <div className="service-tags">
              <span>React</span>
              <span>React Native</span>
              <span>Flutter</span>
            </div>
          </div>

          <div className="service-card design">
            <h3>UI/UX Design</h3>
            <p>
              UI/UX design is the process of bringing together all of the creative elements of a project 
              from user research and strategy, prototyping and project management to creating 
              memorable experiences that convert.
            </p>
            <div className="service-tags">
              <span>Figma Design</span>
              <span>User Research</span>
            </div>
          </div>

          <div className="service-card backend">
            <h3>Node.js Backend</h3>
            <p>
              Robust server-side development with Node.js, creating scalable APIs, 
              database integration, and secure authentication systems for modern web applications.
            </p>
            <div className="service-tags">
              <span>Node.js</span>
              <span>Express</span>
            </div>
          </div>

          <div className="service-card dotnet">
            <h3>.NET Applications</h3>
            <p>
              Enterprise-grade applications using .NET framework, delivering high-performance 
              solutions with robust architecture and seamless integration capabilities.
            </p>
            <div className="service-tags">
              <span>C#</span>
              <span>.NET Core</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner