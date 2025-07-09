import React, { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../services/api';
import './ListaTareas.css';
import { useNavigate } from 'react-router-dom';

const ListaTareas = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) navigate("/login");
    }, [navigate]);

    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false,
        user: localStorage.getItem("userId") || ''
    });
    const [editId, setEditId] = useState(null);

    const fetchTareas = () => {
        getTasks()
            .then(response => {
                setTareas(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Error al cargar las tareas');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTareas();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
            await deleteTask(id);
            fetchTareas();
        }
    };

    const handleEdit = (tarea) => {
        setFormData({
            title: tarea.title,
            description: tarea.description,
            completed: tarea.completed || false,
            user: tarea.user?._id || localStorage.getItem("userId") || ''
        });
        setEditId(tarea._id);
        setFormVisible(true);
    };

    const handleAdd = () => {
        setFormData({
            title: '',
            description: '',
            completed: false,
            user: localStorage.getItem("userId") || ''
        });
        setEditId(null);
        setFormVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert("El título es obligatorio");
            return;
        }

        if (!formData.user) {
            alert("Usuario no identificado");
            return;
        }

        if (editId) {
            await updateTask(editId, formData);
        } else {
            await addTask(formData);
        }
        setFormVisible(false);
        fetchTareas();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="contenedor">
            <div className="btn-container">
                <button className="btn insertar" onClick={handleAdd}>Ingresar nueva tarea</button>
            </div>
            <div className="tareas-grid">
                {tareas.map(tarea => (
                    <div key={tarea._id} className="card">
                        <h3>{tarea.title}</h3>
                        <p><em>{tarea.description}</em></p>
                        <p><strong>Estudiante:</strong> {tarea.user?.nombre || "Desconocido"}</p>
                        <p><strong>Completada:</strong> {tarea.completed ? "Sí" : "No"}</p>
                        <div className="acciones">
                            <button className="btn editar" onClick={() => handleEdit(tarea)}>Editar</button>
                            <button className="btn eliminar" onClick={() => handleDelete(tarea._id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {formVisible && (
                <div className="modal">
                    <form className="formulario" onSubmit={handleSubmit}>
                        <h3>{editId ? "Editar Tarea" : "Nueva Tarea"}</h3>
                        <input
                            type="text"
                            name="title"
                            placeholder="Título"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="completed"
                                checked={formData.completed}
                                onChange={handleChange}
                            />
                            Completada
                        </label>
                        <div className="acciones">
                            <button type="submit" className="btn insertar">Guardar</button>
                            <button type="button" className="btn eliminar" onClick={() => setFormVisible(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
            <br />
            <div className="btn-container">
                <button className="btn cerrar" onClick={() => {
                    localStorage.removeItem("userId");
                    navigate("/login");
                }}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default ListaTareas;
