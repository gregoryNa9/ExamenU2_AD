import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Forms.css';


const Login = () => {
    const [formData, setFormData] = useState({ correo: '', pass: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            localStorage.setItem("userId", res.data.userId);
            navigate("/task");
        } catch (err) {
            setError(err.response.data.message || "Error de inicio de sesión");
        }
    };

    return (
        <div className="contenedor">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
                <input type="password" name="pass" placeholder="Contraseña" onChange={handleChange} required />
                <button type="submit" className="btn insertar">Iniciar Sesión</button>
            </form>
            {error && <p className="error">{error}</p>}
            <br></br>
            <div className="link">
                ¿No tienes una cuenta? <button onClick={() => navigate("/")} className="btn-link">Regístrate</button>
            </div>
        </div>

    );
};

export default Login;