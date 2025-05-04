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
            question: "¿Qué ley de Gestalt explica que agrupamos elementos similares?",
            options: ["Proximidad", "Semejanza", "Cierre", "Continuidad"],
            correct: 1,
            feedback: "¡Correcto! La ley de Semejanza dice que agrupamos elementos que se parecen en forma, color o tamaño."
        },
        {
            type: 'question',
            question: "Si ves puntos que forman una línea aunque no estén conectados, ¿qué ley aplica?",
            options: ["Figura/Fondo", "Continuidad", "Proximidad", "Cierre"],
            correct: 1,
            feedback: "¡Exacto! La ley de Continuidad hace que sigamos líneas aunque no estén completas."
        },
        {
            type: 'matching',
            instruction: "Une cada imagen con la ley de Gestalt que representa:",
            items: [
                { image: "🔵 🔵 🔴 🔴 🔵 🔵", law: "Semejanza" },
                { image: "🔵   🔵   🔵   🔵", law: "Continuidad" },
                { image: "🔵🔵  🔴🔴  🔵🔵", law: "Proximidad" },
                { image: "◻️◻️◻️\n◻️  ◻️\n◻️◻️◻️", law: "Cierre" }
            ]
        },
        {
            type: 'question',
            question: "¿Qué ley nos permite ver una figura aunque esté incompleta?",
            options: ["Semejanza", "Cierre", "Figura/Fondo", "Proximidad"],
            correct: 1,
            feedback: "¡Muy bien! La ley de Cierre hace que nuestra mente complete las figuras incompletas."
        }
    ];

    const handleAnswer = (stepIndex, answer) => {
        if (steps[stepIndex].type === 'question') {
            if (answer === steps[stepIndex].correct) {
                setScore(score + 1);
            }
            setSelectedOptions({ ...selectedOptions, [stepIndex]: answer });
        } else {
            setScore(score + 1);
            setSelectedOptions({ ...selectedOptions, [stepIndex]: 'completed' });
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowConfetti(true);
            completeModule("Leyes de Gestalt");
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

                                <div className="space-y-6 mb-8">
                                    {steps[currentStep].items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="text-4xl">{item.image}</div>
                                            <div className="flex-1">
                                                <div className="font-mono bg-base-200 p-2 rounded">
                                                    Ley de {item.law}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {selectedOptions[currentStep] === undefined && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAnswer(currentStep, 'completed')}
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

            {showCertificate && (
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
