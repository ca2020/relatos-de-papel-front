// src/components/BookCard.jsx

function BookCard({ book, onAddToCart }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
            <div className="w-full aspect-[3/2] overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold mb-2 text-center">{book.title}</h3>
                <p className="text-gray-600 mb-2 text-center">{book.author}</p>
                <p className="text-indigo-600 font-bold mb-4 text-center">${book.price.toFixed(2)}</p>
                <button
                    onClick={() => onAddToCart(book)}
                    className="mt-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
}

export default BookCard;
