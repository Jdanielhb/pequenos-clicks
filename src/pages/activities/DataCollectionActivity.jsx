import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import CertificateModal from '../../components/CertificateModal';
import Confetti from 'react-confetti';

const DataCollectionActivity = ({ user, completeModule }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
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

    const questions = [
        {
            question: "¿Cuál método de recolección de datos es mejor para entender cómo las personas usan realmente un producto?",
            options: [
                "Encuestas en línea",
                "Observación en contexto",
                "Entrevistas telefónicas",
                "Análisis de datos estadísticos"
            ],
            correct: 1,
            feedback: "¡Correcto! La observación en contexto muestra el comportamiento real de los usuarios."
        },
        {
            question: "Si quieres opiniones de muchas personas rápidamente, ¿qué método usarías?",
            options: [
                "Entrevistas individuales",
                "Grupos focales",
                "Encuestas",
                "Pruebas de usabilidad"
            ],
            correct: 2,
            feedback: "¡Exacto! Las encuestas permiten recolectar datos de muchas personas eficientemente."
        },
        {
            question: "¿Qué método te permite hacer preguntas de seguimiento basadas en respuestas previas?",
            options: [
                "Encuestas en papel",
                "Entrevistas en persona",
                "Análisis de datos",
                "Pruebas A/B"
            ],
            correct: 1,
            feedback: "¡Muy bien! En entrevistas puedes adaptar tus preguntas según las respuestas."
        },
        {
            question: "¿Cuál es el principal beneficio de las pruebas de usabilidad?",
            options: [
                "Obtener muchos datos cuantitativos",
                "Identificar problemas reales de uso",
                "Recolectar opiniones generales",
                "Medir el atractivo visual"
            ],
            correct: 1,
            feedback: "¡Sí! Las pruebas de usabilidad revelan problemas prácticos que enfrentan los usuarios."
        }
    ];

    const handleAnswer = () => {
        if (selectedOption === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setShowResult(false);
        } else {
            setShowConfetti(true);
            completeModule("Métodos de Recolección de Datos");
            setTimeout(() => {
                setShowConfetti(false);
                setShowCertificate(true);
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
                    colors={['#4F46E5', '#10B981', '#F59E0B', '#3ABFF8', '#36D399']}
                />
            )}

            <div className="flex-grow p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Actividad: Métodos de Recolección</h1>

                {!showCertificate ? (
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <div className="mb-6">
                            <span className="text-lg font-medium">
                                Pregunta {currentQuestion + 1} de {questions.length}
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                                <div
                                    className="bg-blue-600 h-4 rounded-full"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>

                        <div className="grid grid-cols-1 gap-4 mb-8">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-outline ${selectedOption === index ? 'btn-primary' : ''} justify-start text-lg`}
                                    onClick={() => !showResult && setSelectedOption(index)}
                                >
                                    {String.fromCharCode(65 + index)}. {option}
                                </button>
                            ))}
                        </div>

                        {showResult && (
                            <div className={`alert ${selectedOption === questions[currentQuestion].correct ? 'alert-success' : 'alert-error'} mb-6`}>
                                <div>
                                    <span>{questions[currentQuestion].feedback}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between">
                            {!showResult ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAnswer}
                                    disabled={selectedOption === null}
                                >
                                    Responder
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleNext}
                                >
                                    {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Ver resultados'}
                                </button>
                            )}

                            <div className="badge badge-primary badge-lg p-4">
                                Puntuación: {score}/{currentQuestion + 1}
                            </div>
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
                                    ¡Felicidades {user}! Has completado la actividad con una puntuación de {score}/{questions.length}
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
                            onClick={() => navigate('/data-collection')}
                        >
                            Volver al módulo
                        </button>
                    </div>
                )}
            </div>

            {showCertificate && (
                <CertificateModal
                    user={user}
                    moduleName="Métodos de Recolección de Datos"
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

export default DataCollectionActivity;
