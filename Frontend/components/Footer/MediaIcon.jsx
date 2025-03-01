import React from 'react';
import styles from './Footer.module.css';

const SocialIcon = ({ src, alt }) => {
  return (
    <div className={styles.socialIcon}>
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={styles.socialIconImage}
      />
    </div>
  );
};

export default SocialIcon;