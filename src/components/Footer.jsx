const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <div>
                <span className="footer-title">Pequeños Clicks</span>
                <p>Un proyecto interactivo para aprender diseño y usabilidad</p>
                <p>© 2023 - Todos los derechos reservados</p>
            </div>
            <div>
                <span className="footer-title">Módulos</span>
                <a href="/color-theory" className="link link-hover">Teoría del color</a>
                <a href="/gestalt-laws" className="link link-hover">Leyes de Gestalt</a>
                <a href="/nielsen-principles" className="link link-hover">Principios de Nielsen</a>
            </div>
            <div>
                <span className="footer-title">Más</span>
                <a href="/data-collection" className="link link-hover">Recolección de datos</a>
                <a href="/wireframes" className="link link-hover">Wireframes</a>
                <a href="/certificates" className="link link-hover">Certificados</a>
            </div>
        </footer>
    );
};

export default Footer;
