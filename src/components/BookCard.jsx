import { useNavigate } from "react-router-dom";

function BookCard({ book, onAddToCart }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col border border-gray-100">
            <div className="rounded-xl overflow-hidden h-48 mb-3">
                <img
                    src={book.image}
                    alt={book.title}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 truncate mb-2">{book.author}</p>
                    <p className="text-indigo-600 font-semibold text-sm mb-4">${book.price.toFixed(2)}</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/book/${book.id}`)}
                        className="w-full bg-gray-100 text-gray-700 font-medium text-sm py-1.5 rounded-md hover:bg-gray-200"
                    >
                        Ver más
                    </button>
                    <button
                        onClick={() => onAddToCart(book)}
                        className="w-full bg-indigo-600 text-white font-semibold text-sm py-1.5 rounded-md hover:bg-indigo-700"
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
