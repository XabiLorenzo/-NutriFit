import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importa el CSS específico

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Para redireccionar

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message

    const data = { username, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const result = await response.json();
      alert("Sesión iniciada correctamente. Token recibido: " + result.token);
      localStorage.setItem("authToken", result.token);

      // Redirige al usuario al Home
      navigate("/home");
    } catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/register"); // Redirige a la página de registro
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="login-form">
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
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
      <div className="register-link">
        ¿No tienes una cuenta?{" "}
        <button onClick={goToRegister} className="register-button">
          Regístrate aquí
        </button>
      </div>
    </div>
  );
};

export default Login;


