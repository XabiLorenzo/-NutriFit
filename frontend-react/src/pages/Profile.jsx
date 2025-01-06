import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para manejar redirecciones
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate(); // Hook para redirecciones
    const [user, setUser] = useState(null);
    const [goals, setGoals] = useState(null);
    const [activities, setActivities] = useState([]);
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [goalForm, setGoalForm] = useState({
        calorie_goal: "",
        protein_goal: "",
        carb_goal: "",
        fat_goal: "",
    });
    const [activityForm, setActivityForm] = useState({
        type: "Correr",
        duration: "",
        intensity: "Alta",
    });

    // Obtener el ID del usuario y el token desde localStorage
    const userId = localStorage.getItem("userId") || 7;
    const token = localStorage.getItem("token");

    // Redirigir al home
    const handleHome = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        console.log("Fetching user data...");
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    console.error(`User data response status: ${response.status}`);
                    throw new Error("Error fetching user data.");
                }

                const data = await response.json();
                setUser(data);
                setGoals({
                    calorie_goal: data.calorie_goal || "",
                    protein_goal: data.protein_goal || "",
                    carb_goal: data.carb_goal || "",
                    fat_goal: data.fat_goal || "",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        console.log("Fetching activities...");
        const fetchActivities = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}/activity`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    console.error(`Activity response status: ${response.status}`);
                    if (response.status === 404) {
                        console.log("No activities found for this user.");
                        setActivities([]);
                        return;
                    }
                    throw new Error("Error fetching activities.");
                }

                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchUserData();
        fetchActivities();
    }, [userId, token]);

    const handleGoalSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}/goals`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(goalForm),
            });

            if (response.ok) {
                const updatedGoals = await response.json();
                setGoals(updatedGoals);
                setShowGoalForm(false);
            } else {
                console.error("Failed to update goals:", response.status);
            }
        } catch (error) {
            console.error("Error updating goals:", error);
        }
    };

    const handleActivitySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}/activity`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(activityForm),
            });

            if (response.ok) {
                const newActivity = await response.json();
                setActivities([...activities, newActivity]);
            } else {
                console.error("Failed to add activity:", response.status);
            }
        } catch (error) {
            console.error("Error adding activity:", error);
        }
    };

    if (!user) {
        return <p>Cargando datos del perfil...</p>;
    }

    return (
        <div className="profile-container">
            <header className="home-header">
                <div className="logo">NutriFit</div>
                <div className="header-buttons">
                    <button onClick={handleHome}>Inicio</button>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </header>
            <div className="profile-content">
                <div className="personal-info">
                    <h2>Información Personal</h2>
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {goals ? (
                        <div>
                            <p>Calorías Diarias: {goals.calorie_goal}</p>
                            <p>Proteínas: {goals.protein_goal}g</p>
                            <p>Carbohidratos: {goals.carb_goal}g</p>
                            <p>Grasas: {goals.fat_goal}g</p>
                        </div>
                    ) : (
                        <button onClick={() => setShowGoalForm(true)}>Completar Objetivos</button>
                    )}
                    {showGoalForm && (
                        <form onSubmit={handleGoalSubmit}>
                            <input
                                type="number"
                                placeholder="Calorías"
                                value={goalForm.calorie_goal}
                                onChange={(e) =>
                                    setGoalForm({ ...goalForm, calorie_goal: e.target.value })
                                }
                                required
                            />
                            <input
                                type="number"
                                placeholder="Proteínas (g)"
                                value={goalForm.protein_goal}
                                onChange={(e) =>
                                    setGoalForm({ ...goalForm, protein_goal: e.target.value })
                                }
                                required
                            />
                            <input
                                type="number"
                                placeholder="Carbohidratos (g)"
                                value={goalForm.carb_goal}
                                onChange={(e) =>
                                    setGoalForm({ ...goalForm, carb_goal: e.target.value })
                                }
                                required
                            />
                            <input
                                type="number"
                                placeholder="Grasas (g)"
                                value={goalForm.fat_goal}
                                onChange={(e) =>
                                    setGoalForm({ ...goalForm, fat_goal: e.target.value })
                                }
                                required
                            />
                            <button type="submit">Guardar</button>
                        </form>
                    )}
                </div>
                <div className="activities">
                    <h2>Actividades</h2>
                    {activities.length === 0 ? (
                        <p>No hay actividades registradas.</p>
                    ) : (
                        <div className="activity-grid">
                            {activities.map((activity, index) => (
                                <div key={index} className="activity-card">
                                    <p>Tipo: {activity.type}</p>
                                    <p>Duración: {activity.duration} minutos</p>
                                    <p>Intensidad: {activity.intensity}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <form onSubmit={handleActivitySubmit}>
                        <select
                            value={activityForm.type}
                            onChange={(e) =>
                                setActivityForm({ ...activityForm, type: e.target.value })
                            }
                        >
                            <option value="Correr">Correr</option>
                            <option value="Andar">Andar</option>
                            <option value="Bicicleta">Bicicleta</option>
                            <option value="Natación">Natación</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Duración (min)"
                            value={activityForm.duration}
                            onChange={(e) =>
                                setActivityForm({ ...activityForm, duration: e.target.value })
                            }
                            required
                        />
                        <select
                            value={activityForm.intensity}
                            onChange={(e) =>
                                setActivityForm({ ...activityForm, intensity: e.target.value })
                            }
                        >
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                        <button type="submit">Registrar Actividad</button>
                    </form>
                </div>
            </div>
            <footer className="home-footer">
                <p>&copy; 2025 NutriFit. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Profile;
