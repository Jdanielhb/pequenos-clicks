import { motion } from 'framer-motion';

const ColorModal = ({ color, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
            >
                <div className="flex items-center mb-4">
                    <div
                        className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow"
                        style={{ backgroundColor: color.hex }}
                    ></div>
                    <h3 className="text-2xl font-bold">{color.name}</h3>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Emoción que transmite:</h4>
                    <p className="text-gray-700">{color.emotion}</p>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="btn btn-primary"
                    >
                        Cerrar
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ColorModal;
