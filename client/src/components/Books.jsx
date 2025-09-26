import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books')
      .then(r => r.json())
      .then(setBooks);
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-item">
            <Link to={`/books/${book.id}`}>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;