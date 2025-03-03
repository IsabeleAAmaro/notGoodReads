import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "Frontend/components/KanbanColumn/KanbanColumn.jsx";

// Initial book data (simulate database)
const initialBooks = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", status: "wantToRead" },
  { id: 2, title: "1984", author: "George Orwell", status: "reading" },
  { id: 3, title: "Atomic Habits", author: "James Clear", status: "completed" },
  { id: 4, title: "Dune", author: "Frank Herbert", status: "wantToRead" }
];

const KanbanBoard = () => {
  const [books, setBooks] = useState(initialBooks);

  // Update book status when moved
  const moveBook = (bookId, newStatus) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, status: newStatus } : book
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={styles.board}>
        <KanbanColumn title="Want to Read" status="wantToRead" books={books} moveBook={moveBook} />
        <KanbanColumn title="Reading Now" status="reading" books={books} moveBook={moveBook} />
        <KanbanColumn title="Completed" status="completed" books={books} moveBook={moveBook} />
      </div>
    </DndProvider>
  );
};

const styles = {
  board: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    justifyContent: "center"
  }
};

export default KanbanBoard;
