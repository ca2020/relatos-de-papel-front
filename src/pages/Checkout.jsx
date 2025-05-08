// src/pages/Checkout.jsx

import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Checkout() {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const handleConfirmPurchase = () => {
        alert("¡Compra realizada con éxito! 🎉");
        clearCart();
        navigate("/home"); // Vuelve al Home después de comprar
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    if (cartItems.length === 0) {
        return <div className="checkout checkout--empty">Tu carrito está vacío.</div>;
    }

    return (
        <div className="checkout">
            <h2 className="checkout__title">Resumen de tu compra</h2>
            <ul className="checkout__list">
                {cartItems.map((item) => (
                    <li key={item.id} className="checkout__item">
                        {item.title} - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <p className="checkout__total">Total a pagar: ${totalAmount.toFixed(2)}</p>
            <button className="checkout__button" onClick={handleConfirmPurchase}>
                Confirmar Compra
            </button>
        </div>
    );
}

export default Checkout;
