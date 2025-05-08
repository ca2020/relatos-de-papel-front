// src/components/Toast.jsx

function Toast({ message, onClose }) {
    return (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-6 py-3 rounded shadow-lg animate-fade-in-out z-50">
            {message}
        </div>
    );
}

export default Toast;
