import { motion } from 'framer-motion';

const Certificates = ({ user, completedModules }) => {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Mis Certificados</h1>

                {completedModules.length === 0 ? (
                    <div className="alert alert-info shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Aún no has completado ningún módulo. ¡Completa las actividades para obtener certificados!</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {completedModules.map((module, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl"
                            >
                                <div className="card-body items-center text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h2 className="card-title text-2xl mb-2">Certificado de Finalización</h2>
                                    <p className="text-lg">Otorgado a: <span className="font-bold">{user}</span></p>
                                    <p className="text-lg">Por completar el módulo:</p>
                                    <p className="text-xl font-bold">{module}</p>
                                    <div className="card-actions mt-4">
                                        <button className="btn btn-accent">Descargar</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Certificates;
