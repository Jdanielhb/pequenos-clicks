import { motion } from 'framer-motion';
import { FaPalette, FaShapes, FaListOl, FaClipboardList, FaVectorSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
    const modules = [
        {
            name: "Teoría del Color",
            path: "/color-theory",
            icon: <FaPalette className="text-4xl" />,
            color: "bg-gradient-to-r from-pink-500 to-purple-500"
        },
        {
            name: "Leyes de Gestalt",
            path: "/gestalt-laws",
            icon: <FaShapes className="text-4xl" />,
            color: "bg-gradient-to-r from-green-500 to-blue-500"
        },
        {
            name: "Principios de Nielsen",
            path: "/nielsen-principles",
            icon: <FaListOl className="text-4xl" />,
            color: "bg-gradient-to-r from-yellow-500 to-orange-500"
        },
        {
            name: "Recolección de Datos",
            path: "/data-collection",
            icon: <FaClipboardList className="text-4xl" />,
            color: "bg-gradient-to-r from-red-500 to-pink-500"
        },
        {
            name: "Wireframes",
            path: "/wireframes",
            icon: <FaVectorSquare className="text-4xl" />,
            color: "bg-gradient-to-r from-indigo-500 to-purple-500"
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold mb-4 text-primary">Bienvenido a Pequeños Clicks</h1>
                <p className="text-xl mb-8">Aprende diseño y usabilidad de forma interactiva y divertida</p>

                {!isLoggedIn && (
                    <div className="alert alert-warning max-w-2xl mx-auto">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Debes iniciar sesión para acceder a los módulos de aprendizaje</span>
                        </div>
                    </div>
                )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((module, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`card ${module.color} text-white shadow-xl`}
                    >
                        <div className="card-body items-center text-center">
                            <div className="mb-4">{module.icon}</div>
                            <h2 className="card-title text-2xl mb-2">{module.name}</h2>
                            {isLoggedIn ? (
                                <Link  to={module.path} className="btn btn-accent mt-4">Explorar</Link>
                            ) : (
                                <Link to="/login" className="btn btn-disabled mt-4">Inicia sesión para acceder</Link>

                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
