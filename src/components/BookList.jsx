// src/components/BookList.jsx

import BookCard from "./BookCard";

function BookList({ books, onAddToCart }) {
    return (
        <div className="book-list">
            {books.map(book => (
                <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}

export default BookList;
