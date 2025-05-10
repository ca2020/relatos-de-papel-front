import { useParams, useNavigate } from "react-router-dom";
import { books } from "../mocks/books";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [format, setFormat] = useState("Físico");

    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return <div className="text-center text-xl text-red-500 mt-10">📚 Libro no encontrado.</div>;
    }

    const handleAddToCart = () => {
        addToCart(book);
        alert(`"${book.title}" añadido al carrito (${format})`);
        navigate("/home");
    };

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-gray-50 p-6">
            {/* Imagen */}
            <div className="w-full md:w-1/2 max-w-md mb-6 md:mb-0 md:mr-8">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
            </div>

            {/* Detalles */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2 max-w-xl">
                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-4">Autor: {book.author}</p>
                <p className="text-gray-700 mb-6">{book.description}</p>

                <p className="text-xl text-indigo-600 font-bold mb-4">${book.price.toFixed(2)}</p>

                <div className="mb-4">
                    <span className="font-medium mr-2">Formato:</span>
                    <button
                        onClick={() => setFormat("Físico")}
                        className={`px-3 py-1 rounded-l border ${
                            format === "Físico"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Físico
                    </button>
                    <button
                        onClick={() => setFormat("Digital")}
                        className={`px-3 py-1 rounded-r border ${
                            format === "Digital"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Digital
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded transition-all w-full"
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
}

export default BookDetails;
