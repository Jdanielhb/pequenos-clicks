import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ActivityButton from '../../components/ActivityButton'

const DataCollection = ({ user }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar user={user} />

            <div className="flex-grow p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-primary">Métodos de Recolección de Datos</h1>

                <div className="prose max-w-none mb-8">
                    <p className="text-lg mb-4">
                        Cuando diseñamos algo, necesitamos información para saber qué necesitan las personas y cómo usarán nuestro producto. ¡Recolectar datos es como ser un detective del diseño!
                    </p>

                    <div className="bg-base-200 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Métodos comunes:</h3>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                <strong>Encuestas:</strong> Preguntas que hacemos a muchas personas para conocer sus opiniones.
                            </li>
                            <li>
                                <strong>Entrevistas:</strong> Conversaciones profundas con algunas personas para entender sus necesidades.
                            </li>
                            <li>
                                <strong>Observación:</strong> Ver cómo las personas usan algo en su vida real, sin interferir.
                            </li>
                            <li>
                                <strong>Pruebas de usabilidad:</strong> Pedir a personas que usen nuestro diseño mientras observamos sus dificultades.
                            </li>
                            <li>
                                <strong>Análisis de datos:</strong> Estudiar números y estadísticas sobre cómo las personas interactúan con productos similares.
                            </li>
                        </ul>
                    </div>

                    <p className="text-lg mt-6">
                        Cada método nos da información diferente. Los buenos diseñadores usan varios métodos para tener una visión completa antes de crear sus diseños.
                    </p>
                </div>

                <div className="flex justify-center mt-10">
                    <ActivityButton to="/data-collection-activity" user={user} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default DataCollection
