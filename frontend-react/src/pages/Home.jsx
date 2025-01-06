import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                //http://127.0.0.1:8000/foods
                const response = await fetch("http://localhost:8000/foods");
                if (!response.ok) {
                    throw new Error("Error al obtener los alimentos");
                }
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                setErrorMessage("No se pudieron cargar los alimentos. Intenta más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo">NutriFit</div>
                <div className="header-buttons">
                    <button onClick={() => alert("Ir al perfil no funcional")}>Perfil</button>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </header>

            <div className="home-content">
                <aside className="sidebar">
                    <p>¡Explora!</p>
                    <ul>
                        <li>Verduras</li>
                        <li>Frutas</li>
                        <li>Bebidas</li>
                        <li>Snacks</li>
                    </ul>
                </aside>
                <main className="main-content">
                    {loading && <p>Cargando alimentos...</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {!loading && !errorMessage && (
                        <div className="food-grid">
                            {foods.map((food) => (
                                <div className="food-card" key={food._id}>
                                    <h3>{food.name}</h3>
                                    <p>Tipo: {food.type}</p>
                                    <p>Calorías: {food.calories}</p>
                                    <p>Proteínas: {food.protein}g</p>
                                    <button className="details-button" onClick={() => navigate(`/foods/${food._id}`)}>
                                        Ver Detalles
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <footer className="home-footer">
                <p>&copy; 2025 NutriFit. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
