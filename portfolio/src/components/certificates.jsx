import React from 'react';
import '../styles/certificates.css';

const certifications = [
  { title: 'Career Essentials in Software Development', issuer: 'LinkedIn Learning', link: 'https://www.linkedin.com/learning/certificates/de09902a27cb34af46333508f0ec0171c27f5e80799f01750e5913b50d271d14?trk=share_certificate' },
  { title: 'CSS (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/420d78342a08' },
  { title: 'Java (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/f5686d9c8127' },
  { title: 'JavaScript (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/4e7f18d9160a' },
  { title: 'Python (Basic)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/56ddcb382a41' },
];

const Certifications = () => {
  setTimeout(()=>{
document.querySelector('.main_certifi').classList.add('adder');
  },10)
  return (
    <>
    <div className=" h-150" style={{backgroundColor:'black',height:'fit-content' } }>
    <div className="main_certifi">
      <h2 className='text-center mt-5 text-primary bg-plain mb-5'>Certifications</h2>
    <section className="certifications-section">
      <ul className="certifications-list">
        {certifications.map((cert, index) => (
          <li onClick={()=>{window.location.href=`${cert.link}`}} key={index} className="certification-item">
            <h3>{cert.title}</h3>
            <p>{cert.issuer}</p>
          </li>
        ))}
      </ul>
    </section>
    </div>
    </div>
    </>
  );
};

export default Certifications;
