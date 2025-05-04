import { useState } from 'react';
import { motion } from 'framer-motion';
import ColorModal from '../../components/ColorModal';
import { Link } from 'react-router-dom';

const ColorTheory = () => {
    const [selectedColor, setSelectedColor] = useState(null);

    const colors = [
        { name: "Rojo", hex: "#FF0000", emotion: "Pasión, energía y emoción" },
        { name: "Azul", hex: "#0000FF", emotion: "Calma, confianza y seguridad" },
        { name: "Amarillo", hex: "#FFFF00", emotion: "Felicidad, optimismo y creatividad" },
        { name: "Verde", hex: "#00FF00", emotion: "Naturaleza, crecimiento y armonía" },
        { name: "Naranja", hex: "#FFA500", emotion: "Entusiasmo, diversión y vitalidad" },
        { name: "Morado", hex: "#800080", emotion: "Misterio, lujo y espiritualidad" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-bold mb-6 text-primary">Teoría del Color</h1>
                <div className="prose max-w-4xl mx-auto mb-8">
                    <p className="text-lg">
                        La teoría del color es un fascinante campo que explora cómo percibimos, combinamos y usamos los colores para crear sensaciones, emociones y armonía visual. Desde los primeros experimentos de Isaac Newton con la luz hasta las modernas aplicaciones en diseño y arte, entender cómo los colores interactúan entre sí no solo es esencial para artistas y diseñadores, sino también para todo aquel que desee comunicar de manera efectiva a través de la estética.
                    </p>
                    <p className="text-lg">
                        Conocer las reglas detrás de los colores, como la rueda cromática, las combinaciones armónicas y los contrastes, nos permite transformar la percepción visual y expresar ideas de forma poderosa y atractiva.
                    </p>
                </div>

                <h2 className="text-3xl font-bold mb-6 text-secondary">Haz click en cada color</h2>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {colors.map((color, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="cursor-pointer"
                            onClick={() => setSelectedColor(color)}
                        >
                            <div
                                className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            ></div>
                            <p className="text-center mt-2 font-medium">{color.name}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/color-activity" className="btn btn-accent btn-lg">
                        Juega y Aprende
                    </Link>
                </div>
            </motion.div>

            {selectedColor && (
                <ColorModal color={selectedColor} onClose={() => setSelectedColor(null)} />
            )}
        </div>
    );
};

export default ColorTheory;
