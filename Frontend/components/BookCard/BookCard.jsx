import React from "react";
import { useDrag } from "react-dnd";

const BookCard = ({ book }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "BOOK",
    item: { id: book.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div ref={dragRef} style={{ ...styles.card, opacity: isDragging ? 0.5 : 1 }}>
      <div>
        <h3 style={styles.title}>{book.title}</h3>
        <p style={styles.subtitle}>{book.author}</p>
      </div>
      <button style={styles.button} onClick={() => alert(`Go to ${book.title} details`)}>
        ➝
      </button>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "12px",
    cursor: "grab"
  },
  title: {
    fontSize: "16px",
    margin: "0"
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "0"
  },
  button: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer"
  }
};

export default BookCard;
