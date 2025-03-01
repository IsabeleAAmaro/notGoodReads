import React from 'react';
import styles from './Header.module.css';
import {Button} from 'Frontend/components/Button/Button.jsx';
import {ButtonText} from "../ButtonText/ButtonText.jsx";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ButtonText variant="Inicio">Inicio</ButtonText>
      <div className={styles.authButtons}>
        <Button variant="signIn">Sign In</Button>
        <Button variant="signUp">Sign Up</Button>
      </div>
    </header>
  );
};