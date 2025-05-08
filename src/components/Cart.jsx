import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart({ cartItems, onRemoveItem, onClose, onClearCart, onIncreaseQuantity, onDecreaseQuantity }) {
    const [isVisible, setIsVisible] = useState(false);
    const [removingItemId, setRemovingItemId] = useState(null); // <-- NUEVO
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
            onClearCart();
            onClose();
            navigate("/checkout");
        }, 300);
    };

    const handleRemoveWithAnimation = (itemId) => {
        setRemovingItemId(itemId); // Marcar el item como en proceso de eliminación
        setTimeout(() => {
            onRemoveItem(itemId);
            setRemovingItemId(null);
        }, 300); // Tiempo suficiente para que se vea la animación
    };

    return (
        <aside
            className={`fixed top-0 right-0 w-80 h-screen bg-white shadow-lg p-6 flex flex-col z-50 transform transition-transform duration-300 ${
                isVisible ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">🛒 Tu Carrito</h2>
                <button onClick={handleClose} className="text-red-500 text-2xl font-bold">
                    ❌
                </button>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 flex-grow flex items-center justify-center">
                    Tu carrito está vacío.
                </div>
            ) : (
                <ul className="flex-grow overflow-y-auto space-y-4">
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            className={`flex justify-between items-center p-2 transition-all duration-300 ${
                                removingItemId === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                            }`}
                        >
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-600 mb-2">
                                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onDecreaseQuantity(item.id)}
                                        className="bg-gray-300 text-black font-bold py-1 px-2 rounded"
                                    >
                                        ➖
                                    </button>
                                    <button
                                        onClick={() => onIncreaseQuantity(item.id)}
                                        className="bg-gray-300 text-black font-bold py-1 px-2 rounded"
                                    >
                                        ➕
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveWithAnimation(item.id)} // <-- Ahora usamos animación
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Quitar
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {cartItems.length > 0 && (
                <div className="mt-4">
                    <div className="text-lg font-bold mb-4">
                        Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                    </div>
                    <button
                        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCheckout}
                    >
                        Finalizar compra
                    </button>
                </div>
            )}
        </aside>
    );
}

export default Cart;
