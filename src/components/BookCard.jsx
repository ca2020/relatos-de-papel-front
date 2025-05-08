// src/components/BookCard.jsx

function BookCard({ book, onAddToCart }) {
    return (
        <div className="book-card">
            <img src={book.image} alt={book.title} className="book-card__image" />
            <h3 className="book-card__title">{book.title}</h3>
            <p className="book-card__author">{book.author}</p>
            <p className="book-card__price">${book.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(book)} className="book-card__button">
                Añadir al carrito
            </button>
        </div>
    );
}

export default BookCard;
