// src/pages/BookDetails.jsx

import { useParams, useNavigate } from "react-router-dom";
import { books } from "../mocks/books";
import { useCart } from "../hooks/useCart";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Buscamos el libro por ID
    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return <div>Libro no encontrado.</div>;
    }

    const handleAddToCart = () => {
        addToCart(book);
        alert("Libro añadido al carrito ✅");
        navigate("/home"); // Opcional: volver al Home después de añadir
    };

    return (
        <div className="book-details">
            <img src={book.image} alt={book.title} className="book-details__image" />
            <div className="book-details__info">
                <h2 className="book-details__title">{book.title}</h2>
                <p className="book-details__author">Autor: {book.author}</p>
                <p className="book-details__description">{book.description}</p>
                <p className="book-details__price">${book.price.toFixed(2)}</p>
                <button className="book-details__button" onClick={handleAddToCart}>
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
}

export default BookDetails;
