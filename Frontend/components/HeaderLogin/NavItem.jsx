import React from 'react';
import styles from './Header.module.css';

const NavItem = ({ text }) => {
  return (
    <div className={styles.navItem} tabIndex="0" role="button">
      {text}
    </div>
  );
};

export default NavItem;