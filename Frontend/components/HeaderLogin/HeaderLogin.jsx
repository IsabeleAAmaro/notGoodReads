import React from 'react';
import styles from './HeaderLogin.module.css';
import NavItem from './NavItem';

const Header = () => {
  const navItems = ['Inicio', 'Minhas Leituras', 'Dashboard', 'Configurações'];

  return (
    <header className={styles.header}>
      <nav className={styles.navLinks}>
        {navItems.map((item, index) => (
          <NavItem key={index} text={item} />
        ))}
      </nav>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c2314ecdfc62820197988a0675bb98a6eb80803"
        alt="Not Good Reads Logo"
        className={styles.logo}
      />
      <button className={styles.logoutButton}>Sair</button>
    </header>
  );
};

export default Header;