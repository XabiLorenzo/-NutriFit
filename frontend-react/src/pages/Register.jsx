import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Inicializa correctamente

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const data = { name, username, email, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        console.error("Error en el registro:", errorDetail);
        throw new Error(errorDetail.detail || "Error al registrarse");
      }

      alert("Usuario registrado correctamente");
      navigate("/login"); // Redirige al formulario de login
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Hubo un problema al registrarse. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            placeholder="Introduce tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            placeholder="Introduce tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            placeholder="Introduce tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>
        <p className="login-link">
          ¿Ya tienes una cuenta?{" "}
          <button
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Inicia sesión aquí
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;

