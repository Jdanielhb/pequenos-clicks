import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import CertificateModal from '../../components/CertificateModal';
import Confetti from 'react-confetti';

const NielsenActivity = ({ user, completeModule }) => {
    const [connections, setConnections] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [score, setScore] = useState(0);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Principios de Nielsen con imágenes representativas
    const principles = [
        {
            image: "/src/assets/images/nielsen_visibilidad.png",
            description: "Visibilidad del estado del sistema: El sistema debe mantener informado al usuario sobre lo que está ocurriendo"
        },
        {
            image: "/src/assets/images/nielsen_mundo_real.png",
            description: "Correspondencia con el mundo real: El sistema debe hablar el lenguaje del usuario"
        },
        {
            image: "/src/assets/images/nielsen_control.png",
            description: "Control y libertad del usuario: El usuario debe tener una 'salida de emergencia' claramente marcada"
        },
        {
            image: "/src/assets/images/nielsen_consistencia.png",
            description: "Consistencia y estándares: Los usuarios no deben cuestionar si diferentes palabras significan lo mismo"
        },
        {
            image: "/src/assets/images/nielsen_prevencion.png",
            description: "Prevención de errores: Mejor que un buen mensaje de error es un diseño cuidadoso que prevenga el problema"
        }
    ];

    // Mezclar las descripciones para el ejercicio
    const shuffledDescriptions = principles.map(p => p.description).sort(() => Math.random() - 0.5);

    const handleConnect = (leftItem, rightItem) => {
        setConnections(prev => ({
            ...prev,
            [leftItem]: rightItem
        }));
    };

    const handleItemClick = (item, isLeft) => {
        if (activeItem === null) {
            setActiveItem({ item, isLeft });
        } else {
            if (activeItem.isLeft !== isLeft) {
                if (activeItem.isLeft) {
                    handleConnect(activeItem.item, item);
                } else {
                    handleConnect(item, activeItem.item);
                }
            }
            setActiveItem(null);
        }
    };

    const handleComplete = () => {
        // Verificar respuestas correctas
        let correctAnswers = 0;

        principles.forEach(principle => {
            if (connections[principle.image] === principle.description) {
                correctAnswers++;
            }
        });

        setScore(correctAnswers);
        const passed = correctAnswers >= Math.ceil(principles.length / 2);

        setShowConfetti(true);
        completeModule("Principios de Nielsen", passed);

        if (passed) {
            setTimeout(() => {
                setShowConfetti(false);
                setShowCertificate(true);
            }, 2000);
        } else {
            setTimeout(() => {
                setShowConfetti(false);
            }, 2000);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="flex-grow flex items-center justify-center">
                    <div className="alert alert-warning max-w-md">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Debes iniciar sesión para realizar esta actividad</span>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                    colors={['#4F46E5', '#10B981', '#F59E0B']}
                />
            )}

            <div className="flex-grow p-8 max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Actividad: Principios de Nielsen</h1>

                {!showCertificate ? (
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Une cada imagen con su principio correspondiente
                        </h2>

                        <div className="flex gap-8 mb-8">
                            {/* Columna izquierda - Imágenes */}
                            <div className="grid grid-cols-1 gap-6 w-1/2">
                                {principles.map((principle, index) => (
                                    <div
                                        key={index}
                                        className={`relative flex h-64 w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white justify-center items-center shadow-md transition-all 
                                            ${activeItem?.item === principle.image && activeItem?.isLeft ? 'ring-4 ring-primary' : ''}
                                            ${connections[principle.image] ? 'ring-4 ring-success' : ''}`}
                                        onClick={() => handleItemClick(principle.image, true)}
                                    >
                                        <div className="w-full h-full flex items-center justify-center p-4">
                                            <img
                                                alt={`Principio ${index + 1}`}
                                                className="max-h-full max-w-full object-contain"
                                                src={principle.image}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Columna derecha - Descripciones */}
                            <div className="flex-1 space-y-6">
                                {shuffledDescriptions.map((description, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all h-24 flex items-center
                                            ${activeItem?.item === description && !activeItem?.isLeft ? 'border-primary bg-primary/10' : ''}
                                            ${Object.values(connections).includes(description) ? 'border-success' : 'border-base-300'}`}
                                        onClick={() => handleItemClick(description, false)}
                                    >
                                        {description}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mostrar conexiones actuales */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Tus conexiones:</h3>
                            {Object.keys(connections).length > 0 ? (
                                <ul className="space-y-2">
                                    {Object.entries(connections).map(([image, description]) => {
                                        const principle = principles.find(p => p.image === image);
                                        const isCorrect = principle?.description === description;

                                        return (
                                            <li key={image} className="flex items-center gap-2">
                                                <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                                                    <img
                                                        src={image}
                                                        alt="Principio"
                                                        className="max-h-full max-w-full object-contain"
                                                    />
                                                </div>
                                                <span className="text-primary">→</span>
                                                <span className={`flex-1 ${isCorrect ? 'text-success' : 'text-error'}`}>
                                                    {description}
                                                </span>
                                                {isCorrect ? (
                                                    <span className="text-success">✓</span>
                                                ) : (
                                                    <span className="text-error">✗</span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Aún no has hecho ninguna conexión</p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                className="btn btn-primary"
                                onClick={handleComplete}
                                disabled={Object.keys(connections).length !== principles.length}
                            >
                                Completar Actividad
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="alert alert-success max-w-2xl mx-auto mb-8">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    ¡Felicidades {user}! Has completado la actividad con una puntuación de {score}/{principles.length}
                                </span>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary mr-4"
                            onClick={() => setShowCertificate(true)}
                        >
                            Ver Certificado
                        </button>

                        <button
                            className="btn btn-outline"
                            onClick={() => navigate('/nielsen-principles')}
                        >
                            Volver al módulo
                        </button>
                    </div>
                )}
            </div>

            {showCertificate && score >= Math.ceil(principles.length / 2) && (
                <CertificateModal
                    user={user}
                    moduleName="Principios de Nielsen"
                    onClose={() => {
                        setShowCertificate(false);
                        navigate('/certificates');
                    }}
                />
            )}

            <Footer />
        </div>
    );
};

export default NielsenActivity;
