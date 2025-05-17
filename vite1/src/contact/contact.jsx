import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <h2>Contact Me</h2>
      <p>If you'd like to get in touch, you can reach out to me through the following links:</p>

      <div className="contact-links">
        <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="contact-link">
        https://www.linkedin.com/in/deeraj-bandi-b40029324
        </a>
        <a href="mailto:your-email@example.com" className="contact-link">
          bdeeraj082@gmail.com     </a>
      </div>
    </section>
  );
};

export default Contact;
