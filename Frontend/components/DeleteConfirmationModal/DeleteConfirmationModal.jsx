import React from 'react';
import styles from './DeleteConfirmationModal.module.css';

const DeleteConfirmationModal = ({ onCancel, onDelete }) => {
  return (
    <div className={styles.modalContainer} role="dialog" aria-labelledby="deleteConfirmationTitle">
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 id="deleteConfirmationTitle" className={styles.modalTitle}>
            Tem certeza que deseja deletar esse registro?
          </h2>
          <p className={styles.modalSubtitle}>
            Essa ação não pode ser desfeita.
          </p>
        </div>
        <div className={styles.modalActions}>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            aria-label="Cancelar deleção"
          >
            Cancelar
          </button>
          <button
            className={styles.deleteButton}
            onClick={onDelete}
            aria-label="Confirmar deleção"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;