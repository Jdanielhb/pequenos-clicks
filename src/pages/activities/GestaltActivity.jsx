import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import CertificateModal from '../../components/CertificateModal';
import Confetti from 'react-confetti';

const GestaltActivity = ({ user, completeModule }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(0);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [connections, setConnections] = useState({});
    const [activeItem, setActiveItem] = useState(null);
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

    const steps = [
        {
            type: 'matching',
            instruction: "Une cada imagen con su ley de Gestalt correspondiente:",
            pairs: [
                {
                    left: {
                        image: "/src/assets/images/Ley_de_Semejanza.png",
                    },
                    right: "Agrupamos elementos que comparten características visuales similares",
                    correctRight: "Agrupamos elementos que comparten características visuales similares"
                },
                {
                    left: {
                        image: "/src/assets/images/Ley_de_Proximidad.png",
                    },
                    right: "Elementos cercanos entre sí se perciben como pertenecientes al mismo grupo",
                    correctRight: "Elementos cercanos entre sí se perciben como pertenecientes al mismo grupo"
                },
                {
                    left: {
                        image: "/src/assets/images/Ley_de_Cierre.png",
                    },
                    right: "Nuestra mente completa las figuras incompletas",
                    correctRight: "Nuestra mente completa las figuras incompletas"
                },
                {
                    left: {
                        image: "/src/assets/images/Ley_de_Continuidad.png",
                    },
                    right: "Seguimos líneas y curvas aunque estén interrumpidas",
                    correctRight: "Seguimos líneas y curvas aunque estén interrumpidas"
                }
            ],
            // Mezclar las opciones de la derecha para el ejercicio
            shuffledRight: [
                "Agrupamos elementos que comparten características visuales similares",
                "Seguimos líneas y curvas aunque estén interrumpidas",
                "Nuestra mente completa las figuras incompletas",
                "Elementos cercanos entre sí se perciben como pertenecientes al mismo grupo"
            ]
        }
    ];

    const handleAnswer = (stepIndex, answer) => {
        if (steps[stepIndex].type === 'question') {
            if (answer === steps[stepIndex].correct) {
                setScore(score + 1);
            }
            setSelectedOptions({ ...selectedOptions, [stepIndex]: answer });
        } else {
            // Verificar si todas las conexiones están correctas
            const currentStepData = steps[stepIndex];
            let allCorrect = true;

            currentStepData.pairs.forEach(pair => {
                if (connections[pair.left.image] !== pair.correctRight) {
                    allCorrect = false;
                }
            });

            if (allCorrect) {
                setScore(score + 1);
            }
            setSelectedOptions({ ...selectedOptions, [stepIndex]: 'completed' });
        }
    };

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

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setConnections({});
            setActiveItem(null);
        } else {
            const passed = score >= Math.ceil(steps.length / 2); // Aprobado si tiene al menos la mitad correcta
            setShowConfetti(true);
            completeModule("Leyes de Gestalt", passed);
            
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
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setConnections({});
            setActiveItem(null);
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

            <div className="flex-grow p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Actividad: Leyes de Gestalt</h1>

                {!showCertificate ? (
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <div className="mb-6">
                            <span className="text-lg font-medium">
                                Paso {currentStep + 1} de {steps.length}
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                                <div
                                    className="bg-blue-600 h-4 rounded-full"
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {steps[currentStep].type === 'question' ? (
                            <>
                                <h2 className="text-2xl font-bold mb-6">{steps[currentStep].question}</h2>

                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    {steps[currentStep].options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`btn btn-outline ${selectedOptions[currentStep] === index ? 'btn-primary' : ''} justify-start text-lg`}
                                            onClick={() => handleAnswer(currentStep, index)}
                                            disabled={selectedOptions[currentStep] !== undefined}
                                        >
                                            {String.fromCharCode(65 + index)}. {option}
                                        </button>
                                    ))}
                                </div>

                                {selectedOptions[currentStep] !== undefined && (
                                    <div className={`alert ${selectedOptions[currentStep] === steps[currentStep].correct ? 'alert-success' : 'alert-error'} mb-6`}>
                                        <div>
                                            <span>{steps[currentStep].feedback}</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">{steps[currentStep].instruction}</h2>

                                <div className="flex gap-8 mb-8">
                                    {/* Columna izquierda - Imágenes */}
                                    <div className="grid grid-cols-1 gap-4 w-1/2 justify-center">
                                        {steps[currentStep].pairs.map((pair, index) => (
                                            <div
                                                key={index}
                                                className={`relative flex h-100 w-[300px] cursor-pointer flex-col overflow-hidden rounded-xl bg-white justify-center shadow-md transition-all 
                                                    ${activeItem?.item === pair.left.image && activeItem?.isLeft ? 'ring-4 ring-primary' : ''}
                                                    ${connections[pair.left.image] ? 'ring-4 ring-success' : ''}`}
                                                onClick={() => handleItemClick(pair.left.image, true)}
                                            >
                                                <img
                                                    alt={pair.left.title}
                                                    className="h-[200px] w-[300px]"
                                                    src={pair.left.image}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Columna derecha - Definiciones */}
                                    <div className="flex-1 space-y-4">
                                        {steps[currentStep].shuffledRight.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all 
                                                    ${activeItem?.item === item && !activeItem?.isLeft ? 'border-primary bg-primary/10' : ''}
                                                    ${Object.values(connections).includes(item) ? 'border-success' : 'border-base-300'}`}
                                                onClick={() => handleItemClick(item, false)}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mostrar conexiones actuales */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Tus conexiones:</h3>
                                    {Object.keys(connections).length > 0 ? (
                                        <ul className="space-y-2">
                                            {Object.entries(connections).map(([image, definition]) => {
                                                const pair = steps[currentStep].pairs.find(p => p.left.image === image);
                                                return (
                                                    <li key={image} className="flex items-center gap-2">
                                                        <div className="w-16 h-12 rounded overflow-hidden">
                                                            <img 
                                                                src={image} 
                                                                alt={pair?.left.title || 'Imagen'} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="font-medium">{pair?.left.title}</span>
                                                        <span className="text-primary">→</span>
                                                        <span>{definition}</span>
                                                        {steps[currentStep].pairs.find(p => p.left.image === image)?.correctRight === definition ? (
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

                                {selectedOptions[currentStep] === undefined && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAnswer(currentStep, 'completed')}
                                        disabled={Object.keys(connections).length !== steps[currentStep].pairs.length}
                                    >
                                        Completar Ejercicio
                                    </button>
                                )}
                            </div>
                        )}

                        {selectedOptions[currentStep] !== undefined && (
                            <div className="flex justify-between">
                                {currentStep > 0 && (
                                    <button
                                        className="btn btn-outline"
                                        onClick={handlePrev}
                                    >
                                        Anterior
                                    </button>
                                )}

                                <button
                                    className="btn btn-primary ml-auto"
                                    onClick={handleNext}
                                >
                                    {currentStep < steps.length - 1 ? 'Siguiente' : 'Ver resultados'}
                                </button>

                                <div className="badge badge-primary badge-lg p-4">
                                    Puntuación: {score}/{currentStep + 1}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="alert alert-success max-w-2xl mx-auto mb-8">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    ¡Felicidades {user}! Has completado la actividad con una puntuación de {score}/{steps.length}
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
                            onClick={() => navigate('/gestalt-laws')}
                        >
                            Volver al módulo
                        </button>
                    </div>
                )}
            </div>

            {showCertificate && score >= Math.ceil(steps.length / 2) && (
                <CertificateModal
                    user={user}
                    moduleName="Leyes de Gestalt"
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

export default GestaltActivity;
