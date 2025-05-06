import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ActivityButton from '../../components/ActivityButton'
import { Link } from 'react-router-dom'

const Wireframes = ({ user }) => {
    return (
        <div className="min-h-screen flex flex-col">

            <div className="flex-grow p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-primary">Wireframes</h1>

                <div className="prose max-w-none mb-8">
                    <p className="text-lg mb-4">
                        Un wireframe es como el esqueleto de una página web o aplicación. Es un dibujo simple que muestra dónde irán los botones, textos e imágenes, ¡sin colores ni diseños bonitos todavía!
                    </p>

                    <div className="bg-base-200 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">¿Para qué sirven?</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Planificar la estructura antes de empezar a diseñar</li>
                            <li>Probar diferentes ideas rápidamente</li>
                            <li>Enfocarse en la usabilidad sin distraerse con colores</li>
                            <li>Comunicar ideas al equipo de diseño</li>
                        </ul>
                    </div>

                    <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-2xl font-bold mb-4 text-blue-700">Tipos de Wireframes:</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded shadow">
                                <h4 className="font-bold mb-2">Baja fidelidad</h4>
                                <p>Dibujados a mano, muy simples, para ideas iniciales</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h4 className="font-bold mb-2">Media fidelidad</h4>
                                <p>Digitales pero sin detalles, muestran estructura básica</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h4 className="font-bold mb-2">Alta fidelidad</h4>
                                <p>Más detallados, casi como el diseño final</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <Link to="/wireframe-activity" className="btn btn-accent btn-lg" user={user}>Juega y Aprende  </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Wireframes
