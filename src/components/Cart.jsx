// src/components/Cart.jsx

function Cart({ cartItems, onRemoveItem }) {
    if (cartItems.length === 0) {
        return <div className="cart cart--empty">Tu carrito está vacío.</div>;
    }

    return (
        <div className="cart">
            <h2 className="cart__title">Mi Carrito</h2>
            <ul className="cart__list">
                {cartItems.map((item) => (
                    <li key={item.id} className="cart__item">
                        <span className="cart__item-title">{item.title}</span>
                        <button
                            className="cart__remove-button"
                            onClick={() => onRemoveItem(item.id)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;
