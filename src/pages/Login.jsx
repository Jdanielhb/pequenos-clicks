import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError('Por favor ingresa un nombre de usuario y contraseña');
            return;
        }

        // Para propósitos de prueba, aceptamos cualquier usuario y contraseña
        onLogin(username);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card w-full max-w-md bg-base-100 shadow-xl"
            >
                <div className="card-body">
                    <h2 className="card-title text-3xl mb-6 justify-center">Iniciar Sesión</h2>

                    {error && (
                        <div className="alert alert-error">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nombre de Usuario</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre"
                                className="input input-bordered"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Contraseña</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Ingresar</button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p>Para propósitos de prueba, puedes usar cualquier usuario y contraseña</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
