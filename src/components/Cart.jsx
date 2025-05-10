import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart({ cartItems, onRemoveItem, onClose, onIncreaseQuantity, onDecreaseQuantity }) {
    const [isVisible, setIsVisible] = useState(false);
    const [removingItemId, setRemovingItemId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 10);
        return () => clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleCheckout = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
            navigate("/checkout");
        }, 300);
    };

    const handleRemoveWithAnimation = (itemId) => {
        setRemovingItemId(itemId);
        setTimeout(() => {
            onRemoveItem(itemId);
            setRemovingItemId(null);
        }, 300);
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <aside
            className={`fixed top-0 right-0 w-full sm:w-96 h-screen bg-white shadow-xl p-6 flex flex-col z-50 transform transition-transform duration-300 ${
                isVisible ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">🛒 Carrito</h2>
                <button onClick={handleClose} className="text-red-500 text-2xl font-bold">
                    ❌
                </button>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 flex-grow flex items-center justify-center">
                    Tu carrito está vacío.
                </div>
            ) : (
                <ul className="flex-grow overflow-y-auto space-y-4 pr-2">
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            className={`flex gap-4 items-center transition-all duration-300 ${
                                removingItemId === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                            }`}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-600">
                                    ${item.price.toFixed(2)} x {item.quantity} = <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => onDecreaseQuantity(item.id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        ➖
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button
                                        onClick={() => onIncreaseQuantity(item.id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        ➕
                                    </button>
                                    <button
                                        onClick={() => handleRemoveWithAnimation(item.id)}
                                        className="ml-auto bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cartItems.length > 0 && (
                <div className="mt-6 border-t pt-4">
                    <div className="text-lg font-bold mb-4 text-right">
                        Total: ${calculateTotal()}
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Finalizar compra
                    </button>
                </div>
            )}
        </aside>
    );
}

export default Cart;
