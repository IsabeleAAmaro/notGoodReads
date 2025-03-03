import React from "react";
import { useDrop } from "react-dnd";
import BookCard from "./BookCard";

const KanbanColumn = ({ title, status, books, moveBook }) => {
  const filteredBooks = books.filter((book) => book.status === status);

  // Allow books to be dropped in the column
  const [, dropRef] = useDrop({
    accept: "BOOK",
    drop: (item) => moveBook(item.id, status)
  });

  return (
    <div ref={dropRef} style={styles.column}>
      <h2 style={styles.header}>
        {title} <span style={styles.counter}>{filteredBooks.length}</span>
      </h2>
      {filteredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

const styles = {
  column: {
    width: "473px",
    minHeight: "500px",
    background: "#c8e6c9",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    marginBottom: "16px"
  },
  counter: {
    background: "black",
    color: "white",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px"
  }
};

export default KanbanColumn;
