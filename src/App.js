import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {
  const form = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImagesVisible, setModalImagesVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [animateToggle, setAnimateToggle] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("es");

  // Objeto de traducciones para español e inglés
  const translations = {
    es: {
      header: {
        inicio: "Inicio",
        sobreMi: "Sobre mí",
        habilidades: "Habilidades",
        proyectos: "Mis proyectos",
        contacto: "Contacto",
      },
      home: {
        welcome: "Bienvenidos",
        description: "Soy Mauricio, desarrollador de software. Te invito a conocerme un poco más.",
        button: "Conóceme"
      },
      about: {
        title: "Sobre mí",
        p1: "Mi nombre es Mauricio Urroz, tengo 22 años y soy de Montevideo, Uruguay. Estoy en el mundo de la tecnología desde hace aproximadamente un año. Comencé estudiando en Holberton School, donde fue mi primera experiencia formal en este ámbito, lo que despertó aún más mi pasión.",
        p2: "Me gradué de la carrera Fundamentos de software el pasado 21 de marzo, pero eso fue solo el comienzo. En un mundo donde el aprendizaje nunca termina, mi objetivo es seguir capacitándome y creciendo profesionalmente.",
        p3: "Actualmente, me encuentro realizando una especialización en Machine Learning en Holberton, con el objetivo de aprender cosas nuevas, sin dejar de explorar otras áreas tecnológicas."
      },
      skills: {
        title: "Habilidades y Tecnologías",
        tech: "Tecnologías",
        tools: "Herramientas"
      },
      projects: {
        title: "Mis proyectos",
        project1Title: "Proyecto RCD Reciclaje",
        project1Desc1: "Proyecto final de Holberton Uruguay para la empresa RCD Reciclaje. Desarrollamos un sistema de gestión que automatiza la recolección y reciclaje de residuos de obras de construcción.",
        project1Desc2: "Mi rol fue de Backend Developer, utilizando Python y Django. Trabajando en equipo, logramos cumplir el MVP propuesto y ayudar a la empresa a incursionar en el mundo tecnológico.",
        project1Desc3: "Esta experiencia nos enseñó a gestionar el tiempo, organizar tareas y adaptarnos a las necesidades del cliente en un plazo de un mes.",
        viewRepo: "Ver repositorio",
        viewImages: "Ver imágenes",
        project2Title: "HBNB",
        project2Desc: "Proyecto del segundo trimestre en Holberton. Se creó una plataforma para alquilar espacios (similar a AirBnb), utilizando Python, Flask y un frontend en HTML, CSS y JavaScript.",
        project3Title: "Simple Shell",
        project3Desc: "Realizado en el primer trimestre de Holberton con lenguaje C. El objetivo fue crear una consola para recibir comandos, lo que me permitió comprender el manejo de procesos en sistemas operativos."
      },
      contact: {
        title: "Contacto",
        placeholderName: "Tu nombre",
        placeholderEmail: "Tu email",
        placeholderSubject: "Asunto",
        placeholderMessage: "Tu mensaje",
        send: "Enviar mensaje",
        modalMessage: "¡Mensaje enviado correctamente!"
      },
      buttons: {
        close: "Cerrar"
      }
    },
    en: {
      header: {
        inicio: "Home",
        sobreMi: "About",
        habilidades: "Skills",
        proyectos: "Projects",
        contacto: "Contact",
      },
      home: {
        welcome: "Welcome",
        description: "I'm Mauricio, a software developer. I invite you to get to know me a little more.",
        button: "Get to know me"
      },
      about: {
        title: "About Me",
        p1: "My name is Mauricio Urroz, I am 22 years old and from Montevideo, Uruguay. I've been in the tech world for about a year. I started studying at Holberton School, where I had my first formal experience, which further ignited my passion.",
        p2: "I graduated from the Software Fundamentals course on March 21st, but that was just the beginning. In a world where learning never stops, my goal is to keep improving and growing professionally.",
        p3: "I'm currently specializing in Machine Learning at Holberton, aiming to learn new things while also exploring other tech fields."
      },
      skills: {
        title: "Skills and Technologies",
        tech: "Technologies",
        tools: "Tools"
      },
      projects: {
        title: "My Projects",
        project1Title: "RCD Recycling Project",
        project1Desc1: "Final project for Holberton Uruguay for RCD Recycling. We developed a management system that automates the collection and recycling of construction waste.",
        project1Desc2: "My role was as a Backend Developer, using Python and Django. Working as a team, we met the proposed MVP and helped the company enter the tech world.",
        project1Desc3: "This experience taught us time management, task organization, and adapting to client needs within a one-month timeframe.",
        viewRepo: "View repository",
        viewImages: "View images",
        project2Title: "HBNB",
        project2Desc: "Project for the second quarter at Holberton. A platform was created to rent spaces (similar to AirBnb) using Python, Flask, and a frontend in HTML, CSS, and JavaScript.",
        project3Title: "Simple Shell",
        project3Desc: "Created in the first quarter at Holberton using C. The goal was to build a shell to execute commands, which allowed me to understand process management in operating systems."
      },
      contact: {
        title: "Contact",
        placeholderName: "Your name",
        placeholderEmail: "Your email",
        placeholderSubject: "Subject",
        placeholderMessage: "Your message",
        send: "Send message",
        modalMessage: "Message sent successfully!"
      },
      buttons: {
        close: "Close"
      }
    }
  };

  // Resto del código original
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
      rootElement.classList.add('dark-theme');
    } else {
      rootElement.classList.remove('dark-theme');
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
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_uon95z9',
        'template_34k2kz9',
        form.current,
        't8lZlertU1Ez3G9gu'
      )
      .then(
        (result) => {
          setModalVisible(true);
          setTimeout(() => setModalVisible(false), 3000);
        },
        (error) => {
          alert('Hubo un error, inténtalo nuevamente.');
        }
      );
  };

  const tecnologias = [
    { name: 'Python', logo: '/images/python.png' },
    { name: 'SQL', logo: '/images/sql.png' },
    { name: 'JavaScript', logo: '/images/js.png' },
    { name: 'HTML', logo: '/images/html.png' },
    { name: 'CSS', logo: '/images/css.png' },
    { name: 'MongoDB', logo: '/images/mongodb.png' },
    { name: 'PostgreSQL', logo: '/images/postgresql.png' },
    { name: 'C', logo: '/images/c.png' },
    { name: 'Node.js', logo: '/images/nodejs.png' },
    { name: 'React', logo: '/images/react.png' },
  ];

  const herramientas = [
    { name: 'VSCode', logo: '/images/vscode.png' },
    { name: 'Git', logo: '/images/git.png' },
    { name: 'Docker', logo: '/images/docker.png' },
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
    <div className="app">
      {/* Fondo creativo con burbujas animadas */}
      <div className="creative-background">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bubble" />
        ))}
      </div>

      {/* Header con navegación, toggle de tema y cambio de idioma */}
      <header className="header">
        <div className="desktop-header">
          <div className="header-buttons-container">
            <button className="header-btn" onClick={() => scrollToSection('inicio')}>
              {translations[language].header.inicio}
            </button>
            <button className="header-btn" onClick={() => scrollToSection('sobre-mi')}>
              {translations[language].header.sobreMi}
            </button>
            <button className="header-btn" onClick={() => scrollToSection('habilidades')}>
              {translations[language].header.habilidades}
            </button>
            <button className="header-btn" onClick={() => scrollToSection('proyectos')}>
              {translations[language].header.proyectos}
            </button>
            <button className="header-btn" onClick={() => scrollToSection('contacto')}>
              {translations[language].header.contacto}
            </button>
          </div>
          <div className="header-controls">
            <button className="theme-toggle-btn" onClick={handleThemeToggle}>
              <span className={animateToggle ? 'rotate-icon' : ''}>
                {darkMode ? '☀' : '☾'}
              </span>
            </button>
            <button
              className="language-toggle-btn"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
            >
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>

        <div className="mobile-header">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            &#9776;
          </button>
          <div className="header-controls">
            <button className="theme-toggle-btn" onClick={handleThemeToggle}>
              <span className={animateToggle ? 'rotate-icon' : ''}>
                {darkMode ? '☀' : '☾'}
              </span>
            </button>
            <button
              className="language-toggle-btn"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
            >
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button
              className="header-btn"
              onClick={() => {
                scrollToSection('inicio');
                setMobileMenuOpen(false);
              }}
            >
              {translations[language].header.inicio}
            </button>
            <button
              className="header-btn"
              onClick={() => {
                scrollToSection('sobre-mi');
                setMobileMenuOpen(false);
              }}
            >
              {translations[language].header.sobreMi}
            </button>
            <button
              className="header-btn"
              onClick={() => {
                scrollToSection('habilidades');
                setMobileMenuOpen(false);
              }}
            >
              {translations[language].header.habilidades}
            </button>
            <button
              className="header-btn"
              onClick={() => {
                scrollToSection('proyectos');
                setMobileMenuOpen(false);
              }}
            >
              {translations[language].header.proyectos}
            </button>
            <button
              className="header-btn"
              onClick={() => {
                scrollToSection('contacto');
                setMobileMenuOpen(false);
              }}
            >
              {translations[language].header.contacto}
            </button>
          </div>
        )}
      </header>

      {/* Sección Inicio */}
      <section id="inicio" className="section inicio" data-aos="fade-up">
        <div className="intro-content">
          <h1 id="portfolio-title" className="title color3" data-aos="fade-down">
            {translations[language].home.welcome}
          </h1>
          <p className="project-description" style={{ textAlign: 'center' }}>
            {translations[language].home.description}
          </p>
          <div className="intro-buttons">
            <button className="btn conoceme" onClick={() => scrollToSection('sobre-mi')}>
              {translations[language].home.button}
            </button>
          </div>
        </div>
      </section>

      {/* Sección Sobre mí */}
      <section id="sobre-mi" className="section sobre-mi" data-aos="fade-up">
        <h2 className="section-title">{translations[language].about.title}</h2>
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
              {translations[language].about.p1}
            </p>
            <p className="section-content">
              {translations[language].about.p2}
            </p>
            <p className="section-content">
              {translations[language].about.p3}
            </p>
          </div>
        </div>
      </section>

      {/* Sección Habilidades y Tecnologías */}
      <section id="habilidades" className="section habilidades" data-aos="fade-up">
        <h2 className="section-title">{translations[language].skills.title}</h2>
        <h3 className="subsection-title">{translations[language].skills.tech}</h3>
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
        <h3 className="subsection-title">{translations[language].skills.tools}</h3>
        <div className="skills-container">
          {herramientas.map((tool, index) => (
            <div key={index} className="skill-card" data-aos="zoom-in" data-aos-delay={index * 50}>
              <img src={tool.logo} alt={`Logo de ${tool.name}`} className="skill-logo" />
              <p className="skill-name">{tool.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Mis proyectos */}
      <section id="proyectos" className="section proyectos" data-aos="fade-up">
        <h2 className="section-title">{translations[language].projects.title}</h2>
        <div className="projects-container">
          <div className="project-card" data-aos="fade-up">
            <h3 className="project-title">{translations[language].projects.project1Title}</h3>
            <p className="project-description">
              {translations[language].projects.project1Desc1}
            </p>
            <p className="project-description">
              {translations[language].projects.project1Desc2}
            </p>
            <p className="project-description">
              {translations[language].projects.project1Desc3}
            </p>
            <a
              href="https://github.com/orgs/RCD-Project/repositories"
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations[language].projects.viewRepo}
            </a>
            <button className="btn" onClick={() => setModalImagesVisible(true)}>
              {translations[language].projects.viewImages}
            </button>
          </div>
          <div className="project-card" data-aos="fade-up" data-aos-delay="100">
            <h3 className="project-title">{translations[language].projects.project2Title}</h3>
            <p className="project-description">
              {translations[language].projects.project2Desc}
            </p>
            <a
              href="https://github.com/Mauriciourrozz/holbertonschool-hbnb"
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations[language].projects.viewRepo}
            </a>
          </div>
          <div className="project-card" data-aos="fade-up" data-aos-delay="200">
            <h3 className="project-title">{translations[language].projects.project3Title}</h3>
            <p className="project-description">
              {translations[language].projects.project3Desc}
            </p>
            <a
              href="https://github.com/Mauriciourrozz/holbertonschool-simple_shell"
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations[language].projects.viewRepo}
            </a>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section id="contacto" className="section contacto" data-aos="fade-up">
        <h2 className="section-title">{translations[language].contact.title}</h2>
        <form ref={form} className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="user_name" placeholder={translations[language].contact.placeholderName} required />
          <input type="email" name="user_email" placeholder={translations[language].contact.placeholderEmail} required />
          <input type="text" name="subject" placeholder={translations[language].contact.placeholderSubject} required />
          <textarea name="message" placeholder={translations[language].contact.placeholderMessage} rows="5" required />
          <button type="submit" className="btn">
            {translations[language].contact.send}
          </button>
        </form>
      </section>

      {/* Modal para mensaje de envío */}
      {modalVisible && (
        <div className="modal" data-aos="zoom-in">
          <div className="modal-content">
            <p>{translations[language].contact.modalMessage}</p>
            <button className="btn" onClick={() => setModalVisible(false)}>
              {translations[language].buttons.close}
            </button>
          </div>
        </div>
      )}

      {/* Modal para ver imágenes con navegación */}
      {modalImagesVisible && (
        <div className="modal" onClick={() => setModalImagesVisible(false)} data-aos="zoom-in">
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
              {translations[language].buttons.close}
            </button>
          </div>
        </div>
      )}

      {/* Social Icons */}
      <div className="social-icons" data-aos="fade-up">
        <a
          href="https://www.linkedin.com/in/mauricio-urroz-a89112321/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/Mauriciourrozz" target="_blank" rel="noopener noreferrer">
          <img src="/images/github.png" alt="GitHub" />
        </a>
        <a
          href="mailto:mauriciourrozz@gmail.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/email.png" alt="Email" />
        </a>
      </div>
    </div>
  );
}

export default App;
