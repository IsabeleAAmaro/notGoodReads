import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant: 'signIn' | 'signUp';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
};