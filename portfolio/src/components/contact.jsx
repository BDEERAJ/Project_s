import React, { useState, useEffect } from 'react';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.contact-wrapper').classList.add('adder');
    }, 10);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://quiz-web-ujwh.onrender.com/contact/sendmessage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        alert(`❌ Failed to send message: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('❌ Network error: ' + error.message);
    }
  };

  return (
    <div className="contact-wrapper">
      <h2 className="contact-title">Contact Me</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="contact-input"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="contact-input"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message or Purpose"
          className="contact-textarea"
          required
        ></textarea>
        <button type="submit" className="contact-button">Send Message</button>
      </form>

      <div className="contact-links">
        <ul>
          <li>
            <a href="https://github.com/BDEERAJ" target="_blank" rel="noreferrer">
              <i className="devicon-github-original contact-icon">https://github.com/BDEERAJ</i>
            </a>
          </li>
          <li>
            <a href="https://deerajportfolio12.netlify.app/" target="_blank" rel="noreferrer">
              <i className="devicon-chrome-plain contact-icon">https://deerajportfolio12.netlify.app/</i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/deeraj-bandi-d12345123" target="_blank" rel="noreferrer">
              <i className="devicon-linkedin-plain contact-icon">https://www.linkedin.com/in/deeraj-bandi-d12345123</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
