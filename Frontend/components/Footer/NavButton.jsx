import React from 'react';
import styles from './Footer.module.css';

const NavButton = ({ text }) => {
  return (
    <button className={styles.navButton}>
      {text}
    </button>
  );
};

export default NavButton;