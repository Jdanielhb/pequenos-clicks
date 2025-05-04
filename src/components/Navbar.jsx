// Navbar.jsx
import { Link } from 'react-router-dom';
import { FaPalette, FaShapes, FaListOl, FaClipboardList, FaVectorSquare, FaCertificate, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = ({ user, onLogout }) => {
    const isLoggedIn = !!user;

    return (
        <nav className="navbar bg-primary text-primary-content shadow-lg sticky top-0 z-50">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <motion.span
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="font-bold text-2xl"
                    >
                        Pequeños Clicks
                    </motion.span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn">
                        Módulos
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-neutral">
                        <li><Link to="/color-theory"><FaPalette className="mr-2" />Teoría del Color</Link></li>
                        <li><Link to="/gestalt-laws"><FaShapes className="mr-2" />Leyes de Gestalt</Link></li>
                        <li><Link to="/nielsen-principles"><FaListOl className="mr-2" />Principios de Nielsen</Link></li>
                        <li><Link to="/data-collection"><FaClipboardList className="mr-2" />Recolección de Datos</Link></li>
                        <li><Link to="/wireframes"><FaVectorSquare className="mr-2" />Wireframes</Link></li>
                    </ul>
                </div>

                {isLoggedIn && (
                    <Link to="/certificates" className="btn btn-ghost">
                        <FaCertificate className="mr-2" /> Certificados
                    </Link>
                )}
            </div>

            <div className="navbar-end">
                {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost rounded-btn">
                            <span className="mr-2">Hola, {user}</span>
                            <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                    <span className="text-xs">{user.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-neutral">
                            <li><button onClick={onLogout}>Cerrar sesión</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-accent">
                        <FaUser className="mr-2" /> Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
