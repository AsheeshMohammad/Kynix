import React, { useState } from 'react';

const EmailTest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendWelcomeEmail = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:3001/api/email/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: email }),
      });
      
      const data = await response.json();
      setMessage(data.success ? 'Email sent successfully!' : `Error: ${data.error}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h3>Test Email Sending</h3>
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={sendWelcomeEmail}
        disabled={!email || loading}
        style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Sending...' : 'Send Welcome Email'}
      </button>
      {message && (
        <p style={{ 
          marginTop: '10px', 
          color: message.includes('Error') ? 'red' : 'green' 
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailTest;