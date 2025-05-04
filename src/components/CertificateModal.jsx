import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const CertificateModal = ({ user, moduleName, onClose }) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={300}
                gravity={0.1}
                colors={['#4F46E5', '#10B981', '#F59E0B']}
            />

            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl relative overflow-hidden border-4 border-primary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50"></div>

                <div className="relative z-10 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-primary">Certificado de Finalización</h2>
                    <p className="text-lg mb-6">Se otorga este certificado a</p>
                    <h3 className="text-2xl font-bold mb-6 border-b-2 border-t-2 border-primary py-2">{user}</h3>
                    <p className="text-lg mb-2">Por haber completado exitosamente el módulo:</p>
                    <h4 className="text-xl font-bold text-secondary mb-8">{moduleName}</h4>

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="btn btn-primary"
                        >
                            Cerrar
                        </button>
                        <button
                            className="btn btn-accent"
                            onClick={() => window.print()}
                        >
                            Imprimir Certificado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
