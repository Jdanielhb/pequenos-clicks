import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateModal from '../../components/CertificateModal';
import Confetti from 'react-confetti';

const WireframeBuilderActivity = ({ user, completeModule }) => {
    const [showCertificate, setShowCertificate] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [wireframe, setWireframe] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [draggedItem, setDraggedItem] = useState(null);
    const navigate = useNavigate();

    const wireframeElements = [
        { id: 1, type: 'header', label: 'Encabezado', required: true },
        { id: 2, type: 'navigation', label: 'Menú de navegación', required: true },
        { id: 3, type: 'hero', label: 'Sección Hero', required: false },
        { id: 4, type: 'content', label: 'Área de contenido', required: true },
        { id: 5, type: 'sidebar', label: 'Barra lateral', required: false },
        { id: 6, type: 'footer', label: 'Pie de página', required: true },
        { id: 7, type: 'cta', label: 'Llamado a la acción', required: false }
    ];

    const goodPractices = [
        { id: 1, text: "El encabezado debe estar en la parte superior" },
        { id: 2, text: "El menú de navegación debe ser accesible" },
        { id: 3, text: "El contenido principal debe ser prominente" },
        { id: 4, text: "El pie de página debe estar al final" }
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

    const handleDragStart = (element) => {
        setDraggedItem(element);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (draggedItem && !wireframe.some(item => item.id === draggedItem.id)) {
            setWireframe([...wireframe, draggedItem]);
        }
        setDraggedItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeElement = (id) => {
        setWireframe(wireframe.filter(item => item.id !== id));
    };

    const checkWireframe = () => {
        // Verificar elementos requeridos
        const requiredElements = wireframeElements.filter(el => el.required);
        const missingElements = requiredElements.filter(req =>
            !wireframe.some(el => el.id === req.id)
        );

        if (missingElements.length > 0) {
            setFeedback(`Faltan elementos requeridos: ${missingElements.map(el => el.label).join(', ')}`);
            return;
        }

        // Verificar orden básico
        const hasHeaderFirst = wireframe[0]?.type === 'header';
        const hasFooterLast = wireframe[wireframe.length - 1]?.type === 'footer';

        if (!hasHeaderFirst || !hasFooterLast) {
            setFeedback('Revisa el orden: El encabezado debería ir primero y el pie de página al final');
            return;
        }

        setFeedback('¡Excelente! Has creado un wireframe bien estructurado');
        setIsCompleted(true);
        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
            completeModule("Construcción de Wireframes");
        }, 2000);
    };

    const finishActivity = () => {
        setShowCertificate(true);
    };

    // Componente para renderizar elementos del wireframe
    const WireframeElement = ({ element }) => {
        switch (element.type) {
            case 'header':
                return (
                    <div className="w-full bg-gray-100 p-4 border-b border-gray-300 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            <div className="space-x-3">
                                {[1, 2, 3].map(i => (
                                    <span key={i} className="inline-block w-16 h-6 bg-gray-300 rounded"></span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="inline-block w-6 h-6 bg-gray-300 rounded-full"></span>
                            <span className="inline-block w-6 h-6 bg-gray-300 rounded-full"></span>
                        </div>
                    </div>
                );
            case 'navigation':
                return (
                    <div className="w-full bg-gray-50 p-3 border-b border-gray-200">
                        <div className="flex space-x-4">
                            {['Inicio', 'Productos', 'Servicios', 'Contacto'].map(item => (
                                <span key={item} className="inline-block w-20 h-6 bg-gray-200 rounded"></span>
                            ))}
                        </div>
                    </div>
                );
            case 'hero':
                return (
                    <div className="w-full bg-gray-100 p-8 flex flex-col items-center justify-center space-y-4">
                        <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
                        <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
                        <div className="w-32 h-10 bg-blue-300 rounded"></div>
                    </div>
                );
            case 'content':
                return (
                    <div className="w-full p-4 space-y-4">
                        <div className="w-full h-6 bg-gray-200 rounded"></div>
                        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="border p-2 rounded">
                                    <div className="w-full h-20 bg-gray-100 mb-2"></div>
                                    <div className="w-full h-4 bg-gray-200 mb-1"></div>
                                    <div className="w-3/4 h-3 bg-gray-200"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'sidebar':
                return (
                    <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
                        <div className="space-y-3">
                            {['Categoría 1', 'Categoría 2', 'Categoría 3'].map(item => (
                                <div key={item} className="w-full h-6 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                );
            case 'footer':
                return (
                    <div className="w-full bg-gray-800 text-white p-6">
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="space-y-2">
                                    <div className="w-3/4 h-5 bg-gray-600 rounded"></div>
                                    {[1, 2, 3].map(j => (
                                        <div key={j} className="w-full h-3 bg-gray-600 rounded"></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'cta':
                return (
                    <div className="w-full bg-blue-50 p-6 flex flex-col items-center space-y-4">
                        <div className="w-3/4 h-6 bg-blue-200 rounded"></div>
                        <div className="w-40 h-10 bg-blue-400 rounded"></div>
                    </div>
                );
            default:
                return <div className="p-4 border rounded">{element.label}</div>;
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="alert alert-warning max-w-md">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Debes iniciar sesión para realizar esta actividad</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                    colors={['#4F46E5', '#10B981', '#F59E0B']}
                />
            )}

            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Constructor de Wireframes</h1>

                {!showCertificate ? (
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Panel izquierdo - Elementos disponibles */}
                                <div className="md:w-1/3">
                                    <h2 className="text-xl font-semibold mb-4">Elementos disponibles</h2>
                                    <p className="text-gray-600 mb-4">
                                        Arrastra los elementos al área de trabajo.
                                        Los marcados con <span className="text-red-500">*</span> son requeridos.
                                    </p>
                                    <div className="space-y-4">
                                        {wireframeElements.map(element => (
                                            <div
                                                key={element.id}
                                                draggable
                                                onDragStart={() => handleDragStart(element)}
                                                className={`p-3 border rounded-lg cursor-move hover:bg-gray-50 flex flex-col ${wireframe.some(item => item.id === element.id) ? 'opacity-50' : ''
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium">
                                                        {element.label}
                                                        {element.required && <span className="text-red-500 ml-1">*</span>}
                                                    </span>
                                                    <span className="text-gray-400 text-xs">Arrastrar</span>
                                                </div>
                                                <div className="border rounded p-2 bg-white">
                                                    <WireframeElement element={element} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="text-lg font-medium mb-2">Buenas prácticas</h3>
                                        <ul className="space-y-2">
                                            {goodPractices.map(practice => (
                                                <li key={practice.id} className="flex items-start">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    <span>{practice.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Panel derecho - Área de trabajo */}
                                <div className="md:w-2/3">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">Tu Wireframe</h2>
                                        {wireframe.length > 0 && (
                                            <button
                                                onClick={checkWireframe}
                                                className="btn btn-primary"
                                            >
                                                Verificar Wireframe
                                            </button>
                                        )}
                                    </div>

                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[500px] bg-gray-50"
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                    >
                                        {wireframe.length === 0 ? (
                                            <div className="text-center text-gray-400 py-12">
                                                Arrastra elementos aquí para comenzar
                                            </div>
                                        ) : (
                                            <div className="space-y-0">
                                                {wireframe.map((element, index) => (
                                                    <div
                                                        key={`${element.id}-${index}`}
                                                        className="relative group"
                                                    >
                                                        <WireframeElement element={element} />
                                                        <button
                                                            onClick={() => removeElement(element.id)}
                                                            className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {feedback && (
                                        <div className={`alert ${isCompleted ? 'alert-success' : 'alert-warning'} mt-4`}>
                                            <div>
                                                <span>{feedback}</span>
                                            </div>
                                        </div>
                                    )}

                                    {isCompleted && (
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                onClick={finishActivity}
                                                className="btn btn-primary"
                                            >
                                                Completar actividad
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
                        <div className="alert alert-success mb-8">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    ¡Felicidades {user}! Has completado exitosamente el constructor de wireframes.
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
                    moduleName="Constructor de Wireframes"
                    onClose={() => {
                        setShowCertificate(false);
                        navigate('/certificates');
                    }}
                />
            )}
        </div>
    );
};

export default WireframeBuilderActivity;
