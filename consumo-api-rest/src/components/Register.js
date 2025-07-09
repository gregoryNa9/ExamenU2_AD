import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

const Register = () => {
    const [formData, setFormData] = useState({ nombre: '', correo: '', pass: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert("Registrado con éxito. Inicia sesión.");
            navigate("/login");
        } catch (err) {
            setError(err.response.data.message || "Error en registro");
        }
    };

    return (
        <div className="contenedor">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
                <input type="password" name="pass" placeholder="Contraseña" onChange={handleChange} required />
                <button type="submit" className="btn insertar">Registrar</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Register;