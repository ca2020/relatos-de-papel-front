import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart({ cartItems, onRemoveItem, onClose, onClearCart  }) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate(); // <-- Nuevo

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
            onClearCart(); // <-- Aquí limpiamos el carrito
            onClose();
            navigate("/checkout");
        }, 300);
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
                <ul className="flex-grow overflow-y-auto">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center mb-4">
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => onRemoveItem(item.id)}
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
                    <button
                        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCheckout} // <-- Nuevo
                    >
                        Finalizar compra
                    </button>
                </div>
            )}
        </aside>
    );
}

export default Cart;
