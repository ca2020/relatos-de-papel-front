// src/pages/BookDetails.jsx

import { useParams, useNavigate } from "react-router-dom";
import { books } from "../mocks/books";
import { useCart } from "../hooks/useCart";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return <div className="text-center text-xl text-red-500 mt-10">📚 Libro no encontrado.</div>;
    }

    const handleAddToCart = () => {
        addToCart(book);
        alert("📚 Libro añadido al carrito ✅");
        navigate("/home");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-md mb-6"
                />
                <h2 className="text-2xl font-bold mb-2 text-center">{book.title}</h2>
                <p className="text-gray-600 mb-4 text-center">Autor: {book.author}</p>
                <p className="text-gray-700 mb-4">{book.description}</p>
                <p className="text-xl font-semibold text-indigo-600 mb-6 text-center">
                    ${book.price.toFixed(2)}
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={handleAddToCart}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded transition-all"
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
