import React from 'react';
import styles from './SucessNotification.module.css';
import CheckIcon from './CheckIcon';

const SuccessMessage = () => {
  const handleClose = () => {
  };

  return (
    <div className={styles.successMessage} role="alert">
      <CheckIcon />
      <div className={styles.messageText}>Alterações salvas com sucesso</div>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Fechar mensagem de sucesso"
      >
        <span className={styles.visually-hidden}>Fechar</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L11 11M1 11L11 1" stroke="#00003C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default SuccessMessage;