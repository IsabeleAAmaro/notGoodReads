import React from "react";
import styles from './Footer.module.css';
import NavButton from './NavButton';
import SocialIcon from './SocialIcon';

const Footer = () => {
  const navItems = ['Home', 'About'];
  const socialIcons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/28a767e495204e4d921722e94e8dbb60/1b7d05495375faf7c6101e81d49f664de32a118b3891ec35e4fcb2a73940a716?apiKey=28a767e495204e4d921722e94e8dbb60&", alt: "Twitter icon" },
    { src: "https://cdn.builder.io/api/v1/image/assets/28a767e495204e4d921722e94e8dbb60/a1fa5d611cd2a7950a323f5dde065790218ca6076c3cfe60ae2e2e5b47e743ed?apiKey=28a767e495204e4d921722e94e8dbb60&", alt: "Facebook icon" },
    { src: "https://cdn.builder.io/api/v1/image/assets/28a767e495204e4d921722e94e8dbb60/9b6c0e4cca73190cd89acf68230c6257920eca3c5b2273f538c3eefb5a5f07b6?apiKey=28a767e495204e4d921722e94e8dbb60&", alt: "Instagram icon" }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/28a767e495204e4d921722e94e8dbb60/1b7d05495375faf7c6101e81d49f664de32a118b3891ec35e4fcb2a73940a716?apiKey=28a767e495204e4d921722e94e8dbb60&"
          alt="Company logo"
          className={styles.logo}
        />
        <nav className={styles.navigation}>
          <div className={styles.navButtonsContainer}>
            {navItems.map((item, index) => (
              <NavButton key={index} text={item} />
            ))}
          </div>
        </nav>
        <div className={styles.socialLinksContainer}>
          {socialIcons.map((icon, index) => (
            <SocialIcon key={index} src={icon.src} alt={icon.alt} />
          ))}
        </div>
      </div>
      <div className={styles.copyrightText}>
        NotGoodReads @ 2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;