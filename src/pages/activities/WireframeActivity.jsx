import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateModal from '../../components/CertificateModal';
import Confetti from 'react-confetti';

const WireframeActivity = ({ user, completeModule }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(0);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [sortOrder, setSortOrder] = useState([1, 2, 3, 4, 5]);
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
            type: 'question',
            question: "¿Qué tipo de wireframe es más rápido de crear?",
            options: ["Alta fidelidad", "Media fidelidad", "Baja fidelidad", "Prototipo funcional"],
            correct: 2,
            feedback: "¡Correcto! Los wireframes de baja fidelidad (como dibujos a mano) son los más rápidos."
        },
        {
            type: 'question',
            question: "¿Cuál es el propósito principal de un wireframe?",
            options: [
                "Mostrar los colores finales del diseño",
                "Definir la estructura y disposición de elementos",
                "Incluir todas las imágenes definitivas",
                "Demostrar animaciones complejas"
            ],
            correct: 1,
            feedback: "¡Exacto! Los wireframes se enfocan en la estructura, no en detalles visuales."
        },
        {
            type: 'sorting',
            instruction: "Ordena los pasos del proceso de diseño:",
            items: [
                { id: 1, text: "Crear wireframes de baja fidelidad" },
                { id: 2, text: "Realizar pruebas de usabilidad" },
                { id: 3, text: "Diseñar la interfaz final" },
                { id: 4, text: "Hacer wireframes de alta fidelidad" },
                { id: 5, text: "Identificar necesidades del usuario" }
            ],
            correctOrder: [5, 1, 4, 2, 3]
        },
        {
            type: 'question',
            question: "¿Qué elemento NO es típico en un wireframe?",
            options: [
                "Cajas que representan imágenes",
                "Texto real y definitivo",
                "Líneas para mostrar separación",
                "Placeholders para botones"
            ],
            correct: 1,
            feedback: "¡Muy bien! Los wireframes usan texto simulado (Lorem Ipsum), no el texto final."
        }
    ];

    const handleAnswer = (stepIndex, answer) => {
        if (steps[stepIndex].type === 'question') {
            if (answer === steps[stepIndex].correct) {
                setScore(score + 1);
            }
            setSelectedOptions({ ...selectedOptions, [stepIndex]: answer });
        } else if (steps[stepIndex].type === 'sorting') {
            const isCorrect = JSON.stringify(sortOrder) === JSON.stringify(steps[stepIndex].correctOrder);
            if (isCorrect) {
                setScore(score + 1);
            }
            setSelectedOptions({ ...selectedOptions, [stepIndex]: isCorrect ? 'correct' : 'incorrect' });
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowConfetti(true);
            completeModule("Wireframes");
            setTimeout(() => {
                setShowConfetti(false);
                setShowCertificate(true);
            }, 2000);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const moveItemUp = (index) => {
        if (index === 0) return;
        const newOrder = [...sortOrder];
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
        setSortOrder(newOrder);
    };

    const moveItemDown = (index) => {
        if (index === sortOrder.length - 1) return;
        const newOrder = [...sortOrder];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        setSortOrder(newOrder);
    };

    return (
        <div className="min-h-screen">
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                    colors={['#4F46E5', '#10B981', '#F59E0B']}
                />
            )}

            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Actividad: Wireframes</h1>

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

                                <div className="space-y-4 mb-8">
                                    {sortOrder.map((id, index) => {
                                        const item = steps[currentStep].items.find(i => i.id === id);
                                        return (
                                            <div key={id} className="flex items-center gap-2 bg-base-200 p-4 rounded-lg">
                                                <button
                                                    className="btn btn-circle btn-sm"
                                                    onClick={() => moveItemUp(index)}
                                                    disabled={index === 0}
                                                >
                                                    ↑
                                                </button>
                                                <button
                                                    className="btn btn-circle btn-sm"
                                                    onClick={() => moveItemDown(index)}
                                                    disabled={index === sortOrder.length - 1}
                                                >
                                                    ↓
                                                </button>
                                                <span className="flex-1">{item.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {selectedOptions[currentStep] === undefined && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAnswer(currentStep, 'check')}
                                    >
                                        Verificar Respuesta
                                    </button>
                                )}

                                {selectedOptions[currentStep] !== undefined && (
                                    <div className={`alert ${selectedOptions[currentStep] === 'correct' ? 'alert-success' : 'alert-error'} mb-6`}>
                                        <div>
                                            <span>
                                                {selectedOptions[currentStep] === 'correct'
                                                    ? '¡Correcto! Este es el orden adecuado del proceso de diseño.'
                                                    : 'No es el orden correcto. Inténtalo de nuevo.'}
                                            </span>
                                        </div>
                                    </div>
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
                            onClick={() => navigate('/wireframes')}
                        >
                            Volver al módulo
                        </button>
                    </div>
                )}
            </div>

            {showCertificate && (
                <CertificateModal
                    user={user}
                    moduleName="Wireframes"
                    onClose={() => {
                        setShowCertificate(false);
                        navigate('/certificates');
                    }}
                />
            )}
        </div>
    );
};

export default WireframeActivity;
