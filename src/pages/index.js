import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import './home.css';

const unidades = [
  {
    id: 'UD1',
    icon: '>_',
    title: 'Introducción al entorno Linux',
    description: 'Terminal, comandos básicos y gestión de paquetes.',
    ra: ['RA4', 'RA7'],
    path: '/docs/category/linux',
    available: true,
  },
  {
    id: 'UD2',
    icon: '$',
    title: 'Usuarios, permisos y procesos',
    description: 'Usuarios, permisos, procesos, servicios, logs y scripts básicos.',
    ra: ['RA4'],
  },
  {
    id: 'UD3',
    icon: '↔',
    title: 'Redes TCP/IP y conectividad',
    description: 'Redes TCP/IP, conectividad, SSH y puertos.',
    ra: ['RA5'],
  },
  {
    id: 'UD4',
    icon: '▣',
    title: 'Docker y Docker Compose',
    description: 'Despliegue de servicios y microservicios sencillos.',
    ra: ['RA4', 'RA5', 'RA6'],
  },
  {
    id: 'UD5',
    icon: 'VM',
    title: 'Virtualización e instalación',
    description: 'Virtualización e instalación de sistemas operativos.',
    ra: ['RA2'],
  },
  {
    id: 'UD6',
    icon: 'HW',
    title: 'Hardware y diagnóstico',
    description: 'Componentes hardware, periféricos, redes físicas, diagnóstico y benchmark.',
    ra: ['RA1'],
  },
  {
    id: 'UD7',
    icon: 'FS',
    title: 'Gestión de la información',
    description: 'Sistemas de archivos, particiones, copias y recuperación.',
    ra: ['RA3'],
  },
  {
    id: 'UD8',
    icon: 'DOC',
    title: 'Documentación técnica',
    description: 'Documentación técnica y aplicaciones informáticas de propósito general.',
    ra: ['RA7'],
  },
];

export default function Home() {
  return (
    <Layout
      title="Sistemas Informáticos"
      description="Documentación del módulo de Sistemas Informáticos"
    >
      <main className="erci-home">
        <div className="erci-shell">

          <header className="erci-header">
            <div className="erci-brand">
              <div className="erci-logo">E</div>
              <div>
                <strong>ErciApps</strong>
                <span>Aula digital</span>
              </div>
            </div>

            <div className="erci-course">
              CFGS · Desarrollo de aplicaciones multiplataforma
            </div>
          </header>

          <section className="erci-hero">
            <div className="erci-kicker">
              <span></span>
              CURSO 2026 - 2027
            </div>

            <h1>
              Sistemas
              <br />
              <em>Informáticos</em>
            </h1>

            <p>
              Un recorrido práctico por los sistemas operativos, las redes,
              la virtualización, Docker y la administración de recursos
              informáticos.
            </p>

            <div className="erci-summary">
              <div>
                <strong>08</strong>
                <span>Unidades didácticas</span>
              </div>
              <div>
                <strong>07</strong>
                <span>Resultados de aprendizaje</span>
              </div>
              <div>
                <strong>01</strong>
                <span>Unidad disponible</span>
              </div>
            </div>
          </section>

          <section className="units-section">
            <div className="section-heading">
              <div>
                <span className="section-label">CONTENIDOS DEL MÓDULO</span>
                <h2>Unidades didácticas</h2>
              </div>

              <span className="section-line"></span>
            </div>

            <div className="units-grid">
              {unidades.map((unidad, index) => (
                <article
                  key={unidad.id}
                  className={`unit-card ${
                    unidad.available ? 'is-available featured' : 'is-pending'
                  }`}
                >
                  <div className="unit-top">
                    <span className="unit-number">{unidad.id}</span>
                    <span className="unit-status">
                      {unidad.available ? 'Disponible' : 'En preparación'}
                    </span>
                  </div>

                  <div className="unit-icon">{unidad.icon}</div>

                  <h3>{unidad.title}</h3>
                  <p>{unidad.description}</p>

                  <div className="unit-footer">
                    <div className="ra-list">
                      {unidad.ra.map((ra) => (
                        <span key={ra}>{ra}</span>
                      ))}
                    </div>

                    {unidad.available ? (
                      <Link className="unit-action" to={unidad.path}>
                        Acceder
                        <span>→</span>
                      </Link>
                    ) : (
                      <span className="unit-locked">
                        Próximamente
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="erci-footer">
            <span>ERCI Apps</span>
            <span>·</span>
            <span>Sistemas Informáticos</span>
          </footer>
        </div>
      </main>
    </Layout>
  );
}