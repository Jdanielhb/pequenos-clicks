import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ActivityButton from '../../components/ActivityButton'
import { Link } from 'react-router-dom'

const GestaltLaws = ({ user }) => {
    return (
        <div className="min-h-screen flex flex-col">

            <div className="flex-grow p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-primary">Leyes de Gestalt</h1>

                <div className="prose max-w-none mb-8">
                    <p className="text-lg mb-4">
                        Son "reglas" que explican cómo nuestro cerebro organiza lo que vemos. ¡Sin darnos cuenta, siempre estamos agrupando, completando o buscando orden en las cosas!
                    </p>
                    <p className="text-lg mb-4">
                        Imagina que ves un dibujo de puntos formando una estrella. Aunque solo sean puntos, tu cerebro une los espacios y dice: "¡Es una estrella!". ¡Eso es la Gestalt en acción!
                    </p>
                    <p className="text-lg mb-6">
                        "Es como cuando armas un rompecabezas: no ves las piezas sueltas, sino la imagen completa. ¡Tu cerebro hace lo mismo con todo lo que miras!".
                    </p>

                    <div className="bg-base-200 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Principales Leyes:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Semejanza:</strong> Agrupamos elementos similares en forma, color o tamaño.</li>
                            <li><strong>Proximidad:</strong> Elementos cercanos se perciben como relacionados.</li>
                            <li><strong>Cierre:</strong> Nuestra mente completa las figuras incompletas.</li>
                            <li><strong>Continuidad:</strong> Seguimos líneas y curvas de forma natural.</li>
                            <li><strong>Figura/Fondo:</strong> Diferenciamos objetos del fondo que los rodea.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <Link to="/gestalt-activity" className="btn btn-accent btn-lg" user={user}>Juega y Aprende  </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default GestaltLaws
