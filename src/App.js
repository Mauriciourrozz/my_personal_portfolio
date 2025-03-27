import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

function App() {
  const form = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImagesVisible, setModalImagesVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [animateToggle, setAnimateToggle] = useState(false);

  // Array de imágenes para modal de proyectos (si se requiere)
  const images = [
    "/images/sesion.jpg",
    "/images/imagen1.jpg",
    "/images/imagen2.jpg",
    "/images/coordinacion.jpg",
    "/images/imagen3.jpg"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;
    if (darkMode) {
      rootElement.classList.add("dark-theme");
    } else {
      rootElement.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const handleThemeToggle = () => {
    setAnimateToggle(true);
    setDarkMode((prev) => !prev);
    setTimeout(() => {
      setAnimateToggle(false);
    }, 500);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_uon95z9",
        "template_34k2kz9",
        form.current,
        "t8lZlertU1Ez3G9gu"
      )
      .then(
        (result) => {
          setModalVisible(true);
          setTimeout(() => setModalVisible(false), 3000);
        },
        (error) => {
          alert("Hubo un error, inténtalo nuevamente.");
        }
      );
  };

  const tecnologias = [
    { name: "Python", logo: "/images/python.png" },
    { name: "SQL", logo: "/images/sql.png" },
    { name: "JavaScript", logo: "/images/js.png" },
    { name: "HTML", logo: "/images/html.png" },
    { name: "CSS", logo: "/images/css.png" },
    { name: "MongoDB", logo: "/images/mongodb.png" },
    { name: "PostgreSQL", logo: "/images/postgresql.png" },
    { name: "C", logo: "/images/c.png" },
    { name: "Node.js", logo: "/images/nodejs.png" },
    { name: "React", logo: "/images/react.png" }
  ];

  const herramientas = [
    { name: "VSCode", logo: "/images/vscode.png" },
    { name: "Git", logo: "/images/git.png" },
    { name: "Docker", logo: "/images/docker.png" }
  ];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (modalImagesVisible) setCurrentImageIndex(0);
  }, [modalImagesVisible]);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* Fondo decorativo */}
      <div className="bubble-background" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="bubble"></span>
        ))}
      </div>

      {/* Encabezado y navegación */}
      <header className="main-header">
        <nav className="main-nav">
          <ul className="nav-list">
            <li>
              <button className="nav-btn" onClick={() => scrollToSection("bienvenidos")}>
                Bienvenidos
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollToSection("sobre-mi")}>
                Sobre mí
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollToSection("habilidades")}>
                Habilidades
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollToSection("proyectos")}>
                Proyectos
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollToSection("contacto")}>
                Contacto
              </button>
            </li>
          </ul>
          <button
            className="toggle-theme"
            onClick={handleThemeToggle}
            aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
          >
            <span className={animateToggle ? "rotate-icon" : ""}>
              {darkMode ? "☀" : "☾"}
            </span>
          </button>
        </nav>
      </header>

      {/* Contenido principal */}
      <main id="principal">
        {/* Sección Bienvenidos */}
        <section id="bienvenidos" className="section bienvenidos-section" data-aos="fade-up">
          <div className="container">
            <h1 id="portfolio-title">Bienvenidos</h1>
            <p className="project-description">
              Soy Mauricio, desarrollador de software. Te invito a conocerme un poco más.
            </p>
            <div className="intro-buttons">
              <button className="btn" onClick={() => scrollToSection("sobre-mi")}>
                Conóceme
              </button>
            </div>
          </div>
        </section>

        {/* Sección Sobre mí */}
        <section id="sobre-mi" className="section sobre-mi-section" data-aos="fade-up">
          <div className="container">
            <h2 className="section-title">Sobre mí</h2>
            <div className="sobre-mi-content">
              <div className="profile-container" data-aos="fade-right">
                <img
                  className="profile-photo"
                  src="/images/mauri.jpg"
                  alt="Foto de Mauricio Urroz, desarrollador de software"
                />
              </div>
              <div className="profile-text" data-aos="fade-left">
                <p className="section-content">
                  Mi nombre es Mauricio Urroz, tengo 22 años y soy de Montevideo, Uruguay.
                  Estoy en el mundo de la tecnología desde hace aproximadamente un año. Comencé
                  estudiando en Holberton School, donde fue mi primera experiencia estudiando formalmente 
                  esta habilidad, a medida que avanzaba la carrera, la
                  exigencia y la cantidad de contenido aumentaron, lo que despertó aún más mi pasión.
                </p>
                <p className="section-content">
                  Me gradué de la carrera Fundamentos de software el pasado 21 de marzo, pero eso solamente fue el comienzo,
                  en un mundo donde el aprendizaje nunca termina, mi objetivo es seguir capacitándome para continuar creciendo profesionalmente.
                </p>
                <p className="section-content">
                  Actualmente, me encuentro realizando una especialización de Machine Learning en Holberton, 
                  con el objetivo de aprender cosas nuevas, aunque me gusta explorar otras
                  áreas tecnológicas para estar siempre en constante aprendizaje.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Habilidades */}
        <section id="habilidades" className="section habilidades-section" data-aos="fade-up">
          <div className="container">
            <h2 className="section-title">Habilidades y Tecnologías</h2>
            <h3 className="subsection-title">Tecnologías</h3>
            <div className="skills-container">
              {tecnologias.map((tech, index) => (
                <div
                  key={index}
                  className="skill-card"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <img src={tech.logo} alt={`Logo de ${tech.name}`} className="skill-logo" />
                  <p className="skill-name">{tech.name}</p>
                </div>
              ))}
            </div>
            <h3 className="subsection-title">Herramientas</h3>
            <div className="skills-container">
              {herramientas.map((tool, index) => (
                <div
                  key={index}
                  className="skill-card"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <img src={tool.logo} alt={`Logo de ${tool.name}`} className="skill-logo" />
                  <p className="skill-name">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Proyectos */}
        <section id="proyectos" className="section proyectos-section" data-aos="fade-up">
          <div className="container">
            <h2 className="section-title">Mis Proyectos</h2>
            <div className="projects-container">
              <div className="project-card" data-aos="fade-up">
                <h3 className="project-title">Proyecto RCD Reciclaje</h3>
                <p className="project-description">
                  Proyecto final de Holberton Uruguay para la empresa RCD Reciclaje. Desarrollamos
                  un sistema de gestión que automatiza procesos de recolección y reciclaje de residuos
                  de obras de construcción.
                </p>
                <p className="project-description">
                  Mi rol fue de Backend Developer, utilizando Python y Django. Trabajando en equipo,
                  logramos cumplir el MVP propuesto, ayudando a la empresa a incursionar en el mundo
                  tecnológico.
                </p>
                <p className="project-description">
                  Esta experiencia nos enseñó a gestionar el tiempo, organizar tareas y adaptarnos a las
                  necesidades del cliente en un plazo de un mes.
                </p>
                <a
                  href="https://github.com/orgs/RCD-Project/repositories"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver repositorio
                </a>
                <button className="btn" onClick={() => setModalImagesVisible(true)}>
                  Ver imágenes
                </button>
              </div>
              <div className="project-card" data-aos="fade-up" data-aos-delay="100">
                <h3 className="project-title">HBNB</h3>
                <p className="project-description">
                  Proyecto del segundo trimestre en Holberton. Se creó una plataforma para alquilar
                  espacios (similar a AirBnb), utilizando Python, Flask y una integración con un frontend
                  en HTML, CSS y JavaScript.
                </p>
                <a
                  href="https://github.com/Mauriciourrozz/holbertonschool-hbnb"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver repositorio
                </a>
              </div>
              <div className="project-card" data-aos="fade-up" data-aos-delay="200">
                <h3 className="project-title">Simple Shell</h3>
                <p className="project-description">
                  Realizado en el primer trimestre de Holberton con lenguaje C. El objetivo fue crear una
                  consola para recibir comandos, lo que me permitió comprender el manejo de procesos en
                  sistemas operativos.
                </p>
                <a
                  href="https://github.com/Mauriciourrozz/holbertonschool-printf"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver repositorio
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Contacto */}
        <section id="contacto" className="section contacto-section" data-aos="fade-up">
          <div className="container">
            <h2 className="section-title">Contacto</h2>
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <div className="form-field">
                <label htmlFor="user_name">Tu nombre:</label>
                <input type="text" id="user_name" name="user_name" placeholder="Tu nombre" required />
              </div>
              <div className="form-field">
                <label htmlFor="user_email">Tu email:</label>
                <input type="email" id="user_email" name="user_email" placeholder="Tu email" required />
              </div>
              <div className="form-field">
                <label htmlFor="subject">Asunto:</label>
                <input type="text" id="subject" name="subject" placeholder="Asunto" required />
              </div>
              <div className="form-field">
                <label htmlFor="message">Tu mensaje:</label>
                <textarea id="message" name="message" placeholder="Tu mensaje" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn">
                Enviar mensaje
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <p>&copy; 2025 Mauricio Urroz. Todos los derechos reservados.</p>
      </footer>

      {/* Modal para mensaje de envío */}
      {modalVisible && (
        <div className="modal" data-aos="zoom-in">
          <div className="modal-content">
            <p>¡Mensaje enviado correctamente!</p>
            <button className="btn" onClick={() => setModalVisible(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para ver imágenes */}
      {modalImagesVisible && (
        <div
          className="modal"
          onClick={() => setModalImagesVisible(false)}
          data-aos="zoom-in"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="image-wrapper">
              <button className="arrow prev-arrow" onClick={prevImage}>
                &#60;
              </button>
              <img src={images[currentImageIndex]} alt={`Imagen ${currentImageIndex + 1}`} />
              <button className="arrow next-arrow" onClick={nextImage}>
                &#62;
              </button>
            </div>
            <button className="btn" onClick={() => setModalImagesVisible(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
