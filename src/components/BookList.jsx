import BookCard from "./BookCard";

function BookList({ books, onAddToCart }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
            {books.map((book) => (
                <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}

export default BookList;
