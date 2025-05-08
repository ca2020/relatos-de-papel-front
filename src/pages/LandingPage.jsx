// src/pages/LandingPage.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="landing">
            <h1 className="landing__title">Bienvenido a <span>Relatos de Papel</span> 📚</h1>
            <p className="landing__subtitle">Redirigiendo al catálogo de libros<span className="landing__dots">...</span></p>
        </div>
    );
}

export default LandingPage;
