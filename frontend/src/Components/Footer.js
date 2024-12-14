import React from 'react';
import CaptureImage1 from '../assets/Capture1.PNG';

import fb from '../assets/fb.PNG';
import insta from '../assets/insta.PNG';
import link from '../assets/in.PNG';
const Footer = () => {
  const currentDate = new Date().toLocaleDateString(); 

  return (
    <footer style={styles.footer}>
      <div style={styles.topSection}>
        <p style={styles.contactInfo}>
          info@poliosolutions.com.pk | 030-51242667
        </p>
      </div>
      <div style={styles.middleSection}>
        <div style={styles.polioIcon}>
          <img src={CaptureImage1} alt="Polio Icon" style={styles.icon} />
          <p style={styles.polioText}>Polio Guard Proactive</p>
        </div>
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={fb} alt="Facebook" style={styles.icon} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={link} alt="LinkedIn" style={styles.icon} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={insta} alt="Instagram" style={styles.icon} />
          </a>
        </div>
      </div>
      <div style={styles.bottomSection}>
        <p style={styles.footerText}>© 2024 Polio Guard Proactive. All Rights Reserved.</p>
        <p style={styles.dateText}>Date: {currentDate}</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'rgb(0, 51, 102)',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto', // Keeps it at the bottom
  },
  topSection: {
    marginBottom: '10px',
  },
  contactInfo: {
    fontSize: '14px',
    margin: 0,
  },
  middleSection: {
    marginBottom: '10px',
  },
  polioIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  icon: {
    width: '24px',
    height: '24px',
    marginRight: '8px',
  },
  polioText: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  bottomSection: {
    marginTop: '10px',
  },
  footerText: {
    fontSize: '14px',
    margin: 0,
  },
  dateText: {
    fontSize: '12px',
    margin: 0,
  },
};

export default Footer;
