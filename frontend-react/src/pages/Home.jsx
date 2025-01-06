import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newFood, setNewFood] = useState({
        name: "",
        description: "",
        type: "",
        quantity: "",
        quantity_unit: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        sugar: ""
    });
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch("http://localhost:8000/foods");
                if (!response.ok) {
                    throw new Error("Error al obtener los alimentos");
                }
                const data = await response.json();
                setFoods(data);
                setFilteredFoods(data);
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

    const handleProfile = () => {
        navigate("/profile");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = foods.filter((food) =>
            food.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredFoods(filtered);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewFood((prevFood) => ({ ...prevFood, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/foods/manual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFood),
            });
            if (!response.ok) {
                throw new Error("Error al registrar el alimento");
            }
            const addedFood = await response.json();
            setFoods((prevFoods) => [...prevFoods, addedFood]);
            setFilteredFoods((prevFoods) => [...prevFoods, addedFood]);
            setShowForm(false);
            setNewFood({
                name: "",
                description: "",
                type: "",
                quantity: "",
                quantity_unit: "",
                calories: "",
                protein: "",
                carbs: "",
                fat: "",
                fiber: "",
                sugar: ""
            });
        } catch (error) {
            alert("No se pudo registrar el alimento. Intenta más tarde.");
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo">NutriFit</div>
                <div className="header-buttons">
                    <button onClick={handleProfile}>Perfil</button>
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
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Buscar alimentos..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-bar"
                        />
                        <button className="register-button" onClick={() => setShowForm(!showForm)}>
                            Registrar Alimento
                        </button>
                    </div>

                    {showForm && (
                        <form className="food-form" onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={newFood.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Descripción"
                                value={newFood.description}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="type"
                                placeholder="Tipo"
                                value={newFood.type}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="calories"
                                placeholder="Calorías"
                                value={newFood.calories}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="protein"
                                placeholder="Proteínas (g)"
                                value={newFood.protein}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="carbs"
                                placeholder="Carbohidratos (g)"
                                value={newFood.carbs}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="fat"
                                placeholder="Grasas (g)"
                                value={newFood.fat}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="fiber"
                                placeholder="Fibra (g)"
                                value={newFood.fiber}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="sugar"
                                placeholder="Azúcar (g)"
                                value={newFood.sugar}
                                onChange={handleInputChange}
                            />
                            <button type="submit">Registrar</button>
                        </form>
                    )}

                    {loading && <p>Cargando alimentos...</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {!loading && !errorMessage && (
                        <div className="food-grid">
                            {filteredFoods.map((food) => (
                                <div className="food-card" key={food._id}>
                                    <h3>{food.name}</h3>
                                    <p>Tipo: {food.type}</p>
                                    <p>Calorías: {food.calories}</p>
                                    <p>Proteínas: {food.protein}g</p>
                                    <button
                                        className="details-button"
                                        onClick={() => navigate(`/foods/${food._id}`)}
                                    >
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

