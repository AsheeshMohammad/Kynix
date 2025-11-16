import { useState } from 'react'
import { toast } from 'react-toastify'
import './Contact.css'

const Contact = () => {
  const [showForm, setShowForm] = useState(false)
  const [contact, setContact] = useState('')
  const [error, setError] = useState('')

  const validateInput = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/
    
    if (!value.trim()) {
      return 'Email or phone number is required'
    }
    
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return 'Please enter a valid email or phone number'
    }
    
    return ''
  }

  const scrollToContact = () => {
    setShowForm(!showForm)
    
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleConnect = async () => {
    const validationError = validateInput(contact)
    
    if (validationError) {
      setError(validationError)
      return
    }
    
    setError('')
    
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isEmail = emailRegex.test(contact)
      
      const emailData = {
        name: 'Contact Request',
        email: isEmail ? contact : 'info@kynix.co.in',
        subject: 'New Contact Request - Kynix',
        message: isEmail ? `New contact request from: ${contact}` : `New contact request from phone: ${contact}`
      }
      
      const response = await fetch('http://localhost:3001/api/mail/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast.success('Thank you! We will connect with you soon.')
        setContact('')
        setShowForm(false)
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <section className="contact">
      <div className="container">
        <h2>Let's Connect</h2>
        <p>Ready to bring your ideas to life? Here's how to get in touch:</p>
        
        <div className="contact-flow">
          <div className="flow-step">
            <span className="step-number">1</span>
            <button 
              className="lets-talk-btn"
              onClick={scrollToContact}
            >
              Let's Talk
            </button>
          </div>

          {showForm && (
            <div className="contact-form">
              <div className="flow-step">
                <span className="step-number">2</span>
                <div>
                  <input
                    type="text"
                    placeholder="Enter email or phone number"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value)
                      if (error) setError('')
                    }}
                    className={`contact-input ${error ? 'error' : ''}`}
                  />
                  {error && <div className="error-message">{error}</div>}
                </div>
              </div>
              
              <div className="flow-step">
                <span className="step-number">3</span>
                <button 
                  className="connect-btn"
                  onClick={handleConnect}
                >
                  Let's Connect
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="contact-alternatives">
          <p>Or reach us directly:</p>
          <div className="contact-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:info@kynix.co.in">
              info@kynix.co.in
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact