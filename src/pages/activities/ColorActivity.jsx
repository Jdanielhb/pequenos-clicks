import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const ColorActivity = ({ completeModule }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const navigate = useNavigate();

    const questions = [
        {
            question: "¿Qué color representa la pasión y la energía?",
            options: ["Azul", "Verde", "Rojo", "Amarillo"],
            correctAnswer: "Rojo"
        },
        {
            question: "¿Qué color transmite calma y confianza?",
            options: ["Naranja", "Azul", "Morado", "Verde"],
            correctAnswer: "Azul"
        },
        {
            question: "¿Qué color está asociado con la naturaleza y la armonía?",
            options: ["Amarillo", "Rojo", "Verde", "Morado"],
            correctAnswer: "Verde"
        }
    ];

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

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);

        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
            } else {
                setShowResult(true);
                if (score + (answer === questions[currentQuestion].correctAnswer ? 1 : 0) >= questions.length / 2) {
                    setShowConfetti(true);
                    completeModule("Teoría del Color");
                    setTimeout(() => setShowConfetti(false), 5000);
                }
            }
        }, 1000);
    };

    const restartActivity = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
    };

    const getButtonClass = (option) => {
        if (!selectedAnswer) return "btn-outline";
        if (option === questions[currentQuestion].correctAnswer) return "btn-success";
        if (option === selectedAnswer && option !== questions[currentQuestion].correctAnswer) return "btn-error";
        return "btn-outline";
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Actividad: Teoría del Color</h1>

                {!showResult ? (
                    <div className="bg-base-100 rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Pregunta {currentQuestion + 1} de {questions.length}</span>
                                <span className="text-sm font-medium">Puntuación: {score}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`btn ${getButtonClass(option)} w-full`}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-lg shadow-lg p-6 text-center">
                        <h2 className="text-3xl font-bold mb-6">Resultados</h2>
                        <p className="text-xl mb-4">Obtuviste {score} de {questions.length} respuestas correctas</p>

                        {score >= questions.length / 2 ? (
                            <>
                                <div className="alert alert-success mb-6">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>¡Felicidades! Has completado este módulo.</span>
                                    </div>
                                </div>
                                <p className="mb-6">Tu certificado está disponible en la sección de Certificados.</p>
                            </>
                        ) : (
                            <div className="alert alert-warning mb-6">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>¡Casi lo logras! Inténtalo de nuevo para mejorar tu puntuación.</span>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={restartActivity} className="btn btn-primary">
                                Reintentar
                            </button>
                            <Link to="/color-theory" className="btn btn-outline">
                                Volver al módulo
                            </Link>
                            <Link to="/" className="btn btn-accent">
                                Ir al inicio
                            </Link>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ColorActivity;
