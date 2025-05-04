import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ActivityButton from '../../components/ActivityButton'

const NielsenPrinciples = ({ user }) => {
    const principles = [
        "Visibilidad del estado del sistema",
        "Correspondencia entre el sistema y el mundo real",
        "Control y libertad del usuario",
        "Consistencia y estándares",
        "Prevención de errores",
        "Reconocimiento antes que recuerdo",
        "Flexibilidad y eficiencia de uso",
        "Diseño estético y minimalista",
        "Ayuda a los usuarios a reconocer, diagnosticar y recuperarse de errores",
        "Ayuda y documentación"
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar user={user} />

            <div className="flex-grow p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-primary">Los 10 principios de Jakob Nielsen</h1>

                <div className="prose max-w-none mb-8">
                    <p className="text-lg mb-6">
                        Jakob Nielsen es un experto en usabilidad y experiencia de usuario, y creó un conjunto de 10 principios llamados heurísticas de usabilidad. Estas heurísticas son reglas o guías que los diseñadores usan para asegurarse de que los sitios web y las aplicaciones sean fáciles de usar. Al seguir estas reglas, se mejora la experiencia de las personas que utilizan una página o app, ayudándolas a navegar de forma más sencilla y sin confusión.
                    </p>

                    <div className="bg-base-200 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Los 10 principios:</h3>
                        <ol className="list-decimal pl-6 space-y-3">
                            {principles.map((principle, index) => (
                                <li key={index} className="font-medium">
                                    {principle}
                                    {index === 0 && " - El sistema debe mantener informados a los usuarios sobre lo que está ocurriendo."}
                                    {index === 2 && " - Los usuarios necesitan tener una 'salida de emergencia' para salir de estados no deseados."}
                                    {index === 5 && " - Minimizar la carga de memoria del usuario haciendo visibles objetos, acciones y opciones."}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <ActivityButton to="/nielsen-activity" user={user} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default NielsenPrinciples
