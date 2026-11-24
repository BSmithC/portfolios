/**
 * Contenido editable del portafolio (ES / EN).
 * Fuente: portafolio original y CVs reales del propietario (ES/EN).
 * Los campos de texto pueden ser un string o un objeto { es, en }.
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: 'Billy Smith Capellán Arciniega',
    // PROVISIONAL: confirmar si se desea mostrar el indicador de disponibilidad.
    availability: { es: 'Disponible para nuevas colaboraciones', en: 'Open to new collaborations' },
    github: 'https://github.com/BSmithC',
    cv: {
      es: 'cv/cv-es.pdf',
      en: 'cv/cv-en.pdf',
    },
  },

  skills: [
    {
      id: 'frontend',
      title: 'Frontend',
      description: { es: 'Interfaces y experiencias', en: 'Interfaces and experiences' },
      items: [
        { name: 'React.js', mark: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'HTML5', mark: 'H5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', mark: 'C3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Tailwind CSS', mark: 'TW', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Inertia.js', mark: 'IN' },
        { name: 'Vue.js', mark: 'V', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
        { name: 'JavaScript', mark: 'JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend',
      description: { es: 'Servicios y lógica de negocio', en: 'Services and business logic' },
      items: [
        { name: 'Laravel', mark: 'L', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
        { name: 'PHP', mark: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: { es: 'APIs REST', en: 'REST APIs' }, mark: 'API', fa: 'fa-solid fa-diagram-project' },
        { name: { es: 'Backend Development', en: 'Backend Development' }, mark: 'BE', fa: 'fa-solid fa-server' },
        { name: 'SQL', mark: 'SQL', fa: 'fa-solid fa-database' },
      ],
    },
    {
      id: 'mobile',
      title: 'Mobile',
      description: { es: 'Aplicaciones Android', en: 'Android applications' },
      items: [
        { name: 'React Native', mark: 'RN', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Kotlin', mark: 'KT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
        { name: { es: 'Android Development', en: 'Android Development' }, mark: 'AN', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
        { name: 'Jetpack Compose', mark: 'JC' },
        { name: 'Android Studio', mark: 'AS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
      ],
    },
    {
      id: 'databases',
      title: { es: 'Bases de datos', en: 'Databases' },
      description: { es: 'Persistencia y datos', en: 'Persistence and data' },
      items: [
        { name: 'MySQL', mark: 'MY', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'SQLite', mark: 'SQ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
        { name: 'Firebase', mark: 'FB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
        { name: 'Firestore', mark: 'FS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
        { name: 'Oracle Database', mark: 'OR', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
      ],
    },
    {
      id: 'tools',
      title: { es: 'Herramientas', en: 'Tools' },
      description: { es: 'Flujo de trabajo y diseño', en: 'Workflow and design' },
      items: [
        { name: 'Git', mark: 'G', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', mark: 'GH', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
        { name: 'Linux', mark: 'LX', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', invert: true },
        { name: 'Figma', mark: 'FG', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Adobe Illustrator', mark: 'AI' },
        { name: 'Adobe InDesign', mark: 'ID' },
        { name: 'VirtualBox', mark: 'VB', fa: 'fa-solid fa-desktop' },
      ],
    },
  ],

  // imageWidth/imageHeight deben coincidir con el archivo real.
  // El marco de la tarjeta define la proporción; object-fit: contain muestra la captura completa.
  // Tags obtenidos de los manifests reales en C:\laragon\www:
  // package.json, composer.json, .env / config/database.php y presencia de .git.
  projects: [
    {
      id: 'bjinvoices',
      name: 'BJInvoices',
      image: 'img/BJInvoices.png',
      imageWidth: 1504,
      imageHeight: 886,
      alt: { es: 'Captura de la interfaz de BJInvoices', en: 'Screenshot of the BJInvoices interface' },
      summary: {
        es: 'Sistema completo de inventario y facturación para gestionar productos, stock y ventas de forma eficiente.',
        en: 'Complete inventory and billing system to efficiently manage products, stock and sales.',
      },
      tags: ['Laravel', 'Vue.js', 'Inertia.js', 'Tailwind CSS', 'PHP', 'MySQL', 'Vite', 'Firebase', 'ApexCharts', 'DOMPDF', 'Git'],
      features: [
        { es: 'Gestión de productos y control de stock', en: 'Product management and stock control' },
        { es: 'Registro y administración de ventas', en: 'Sales recording and administration' },
        { es: 'Emisión y seguimiento de facturas', en: 'Invoice issuance and tracking' },
      ],
      // No hay URLs reales disponibles: no se generan enlaces ficticios.
      repoUrl: null,
      demoUrl: null,
    },
    {
      id: 'bjgastrosoft',
      name: 'BJGastroSoft',
      image: 'img/BJGastroSoft.png',
      imageWidth: 1237,
      imageHeight: 952,
      alt: { es: 'Captura de la interfaz de BJGastroSoft', en: 'Screenshot of the BJGastroSoft interface' },
      summary: {
        es: 'Sistema de inventario y facturación para restaurantes, bares y cafeterías: productos, mesas y ventas en un solo lugar.',
        en: 'Inventory and billing system for restaurants, bars and cafés: products, tables and sales in one place.',
      },
      tags: ['Laravel', 'Vue.js', 'Inertia.js', 'Tailwind CSS', 'PHP', 'MySQL', 'Vite', 'Chart.js', 'ApexCharts', 'Vue I18n', 'Escpos', 'Git'],
      features: [
        { es: 'Administración de productos e inventario', en: 'Product and inventory administration' },
        { es: 'Gestión de mesas y pedidos', en: 'Table and order management' },
        { es: 'Control de ventas y facturación', en: 'Sales and billing control' },
      ],
      repoUrl: null,
      demoUrl: null,
    },
    {
      id: 'clinicsoft',
      name: 'ClinicSoft',
      image: 'img/ClinicSoft.png',
      imageWidth: 912,
      imageHeight: 444,
      alt: { es: 'Captura de la interfaz de ClinicSoft', en: 'Screenshot of the ClinicSoft interface' },
      summary: {
        es: 'Sistema de citas médicas: agenda de pacientes, gestión de doctores y control de consultas con facilidad.',
        en: 'Medical appointment system: schedule patients, manage doctors and control consultations with ease.',
      },
      tags: ['Laravel', 'Vue.js', 'Inertia.js', 'Tailwind CSS', 'PHP', 'MySQL', 'Vite', 'Google Calendar', 'Sanctum', 'Spatie Permission', 'Git'],
      features: [
        { es: 'Programación y agenda de citas', en: 'Appointment scheduling and calendar' },
        { es: 'Gestión de pacientes y doctores', en: 'Patient and doctor management' },
        { es: 'Control de consultas médicas', en: 'Medical consultation control' },
      ],
      repoUrl: 'https://github.com/BSmithC/ClinicSoft',
      demoUrl: null,
    },
    {
      id: 'hotelsync',
      name: 'HotelSync',
      image: 'img/HotelSync.png',
      imageWidth: 1526,
      imageHeight: 962,
      alt: { es: 'Captura de la interfaz de HotelSync', en: 'Screenshot of the HotelSync interface' },
      summary: {
        es: 'Sistema de gestión hotelera multi-sucursal que centraliza huéspedes, habitaciones, reservas, facturación, inventario y operación diaria en una sola aplicación.',
        en: 'Multi-branch hotel management system that centralizes guests, rooms, reservations, billing, inventory and daily operations in one application.',
      },
      tags: ['Laravel', 'React', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'PHP', 'MySQL', 'Vite', 'Fortify', 'Recharts', 'Git'],
      features: [
        { es: 'Recepción con check-in, check-out, cambio de habitación e incidencias', en: 'Front desk with check-in, check-out, room changes and incidents' },
        { es: 'Reservas, facturación, cobros, gastos y reportes con exportación CSV', en: 'Reservations, billing, payments, expenses and reports with CSV export' },
        { es: 'Inventario por hotel, servicios de huéspedes y accesos por roles', en: 'Per-hotel inventory, guest services and role-based access control' },
      ],
      repoUrl: 'https://github.com/BSmithC/HotelSync',
      demoUrl: null,
    },
    {
      id: 'kizunasound',
      name: 'KizunaSound',
      image: 'img/KizunaSound.png',
      imageWidth: 1854,
      imageHeight: 945,
      alt: { es: 'Captura de la interfaz de KizunaSound', en: 'Screenshot of the KizunaSound interface' },
      summary: {
        es: 'Plataforma musical con biblioteca, favoritos y listas de reproducción, un reproductor persistente y descubrimiento por estado de ánimo, con estética japonesa.',
        en: 'Music platform with a library, favourites and playlists, a persistent player and mood-based discovery, with a Japanese-inspired design.',
      },
      tags: ['Laravel', 'Vue.js', 'Inertia.js', 'Tailwind CSS', 'PHP', 'MySQL', 'Vite', 'Pinia', 'Sanctum', 'Git'],
      features: [
        { es: 'Reproductor persistente con cola, aleatorio, repetición e historial', en: 'Persistent player with queue, shuffle, repeat and history' },
        { es: 'Exploración y búsqueda de canciones, álbumes, artistas y géneros', en: 'Browse and search songs, albums, artists and genres' },
        { es: 'Biblioteca personal, favoritos y listas de reproducción administrables', en: 'Personal library, favourites and manageable playlists' },
      ],
      repoUrl: 'https://github.com/BSmithC/KizunaSound',
      demoUrl: null,
    },
    {
      id: 'spendtrack',
      name: 'SpendTrack',
      image: 'img/SpendTrack.png',
      imageWidth: 1875,
      imageHeight: 968,
      alt: { es: 'Captura de la interfaz de SpendTrack', en: 'Screenshot of the SpendTrack interface' },
      summary: {
        es: 'Sistema web de finanzas personales para registrar ingresos y gastos, organizar categorías y seguir el gasto con gráficas e indicadores.',
        en: 'Personal finance web app to record income and expenses, organize categories and track spending with charts and dashboards.',
      },
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Inertia.js', 'Tailwind CSS', 'PHP', 'Vite', 'Git'],
      features: [
        { es: 'Registro, edición y eliminación de ingresos y gastos', en: 'Add, edit and delete income and expenses' },
        { es: 'Categorías personalizables y filtros por fecha o categoría', en: 'Customizable categories and filters by date or category' },
        { es: 'Panel con gráficas de gastos por categoría', en: 'Dashboard with charts of spending by category' },
      ],
      repoUrl: 'https://github.com/BSmithC/SpendTrack',
      demoUrl: null,
    },
    {
      id: 'citamed',
      name: 'CitaMed',
      image: 'img/CitaMed.jpg',
      imageWidth: 1080,
      imageHeight: 2198,
      alt: { es: 'Captura de la interfaz de CitaMed', en: 'Screenshot of the CitaMed interface' },
      summary: {
        es: 'Aplicación nativa para Android que organiza citas médicas, historial clínico y disponibilidad de especialistas, con funcionamiento offline.',
        en: 'Native Android app for managing medical appointments, clinical history and specialist availability, working offline.',
      },
      tags: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Android Studio', 'Material Design 3', 'Git'],
      features: [
        { es: 'Agendamiento de citas con perfiles de paciente y doctor', en: 'Appointment scheduling with patient and doctor profiles' },
        { es: 'Historial médico, notas clínicas y estadísticas de visitas', en: 'Medical history, clinical notes and visit statistics' },
        { es: 'Disponibilidad configurable, facturación local y recordatorios', en: 'Configurable availability, local billing and reminders' },
      ],
      repoUrl: 'https://github.com/BSmithC/CitaMed',
      demoUrl: null,
    },
    {
      id: 'quickmed',
      name: 'QuickMed',
      image: 'img/QuickMed.png',
      imageWidth: 796,
      imageHeight: 1600,
      alt: { es: 'Captura de la interfaz de QuickMed', en: 'Screenshot of the QuickMed interface' },
      // Sin repositorio público ni código verificable: solo se afirma el stack declarado.
      summary: {
        es: 'Aplicación móvil construida con Expo 54, React Native, Expo Router y TypeScript, con integración de Firebase.',
        en: 'Mobile app built with Expo 54, React Native, Expo Router and TypeScript, with Firebase integration.',
      },
      tags: ['Expo', 'React Native', 'Expo Router', 'TypeScript', 'Firebase', 'Git'],
      features: [
        { es: 'Aplicación móvil desarrollada con Expo 54 y React Native', en: 'Mobile app built with Expo 54 and React Native' },
        { es: 'Navegación con Expo Router y código tipado en TypeScript', en: 'Navigation with Expo Router and typed code in TypeScript' },
        { es: 'Integración con Firebase', en: 'Firebase integration' },
      ],
      // El enlace proporcionado (BSmithC/QuickMed) devuelve 404: no se publica.
      repoUrl: null,
      demoUrl: null,
    },
  ],

  timeline: [
    {
      type: { es: 'Formación', en: 'Education' },
      date: { es: '11.º semestre', en: '11th semester' },
      title: { es: 'Ingeniería en Sistemas de Computación', en: 'Computer Systems Engineering' },
      org: 'Universidad Católica del Cibao (UCATECI)',
      description: {
        es: 'Formación universitaria en ingeniería de sistemas de computación, actualmente en 10.º semestre.',
        en: 'University studies in Computer Systems Engineering, currently in the 10th semester.',
      },
    },
    {
      type: { es: 'Formación', en: 'Education' },
      date: 'INFOTEP',
      title: {
        es: 'Reparación de equipos informáticos',
        en: 'Computer equipment repair',
      },
      org: 'INFOTEP',
      description: {
        es: 'Curso de reparación de equipos informáticos y operaciones básicas de programas de oficina.',
        en: 'Course in computer equipment repair and basic office software operations.',
      },
    },
    {
      type: { es: 'Trayectoria', en: 'Experience' },
      date: { es: '3+ años', en: '3+ years' },
      title: { es: 'Desarrollo Full-Stack', en: 'Full-Stack Development' },
      org: { es: 'Proyectos para clientes y personales', en: 'Client and personal projects' },
      description: {
        es: 'Desarrollo de aplicaciones web para restaurantes, clínicas y pequeños negocios, además de proyectos personales.',
        en: 'Web applications for restaurants, clinics and small businesses, plus personal projects.',
      },
    },
    {
      type: { es: 'Trayectoria', en: 'Experience' },
      date: { es: '20+ proyectos', en: '20+ projects' },
      title: { es: 'Proyectos entregados', en: 'Projects delivered' },
      org: { es: 'Clientes y proyectos personales', en: 'Clients and personal projects' },
      description: {
        es: 'Construcción de herramientas reales para negocios, con foco en código limpio y aprendizaje continuo.',
        en: 'Building real tools for businesses, with a focus on clean code and continuous learning.',
      },
    },
    {
      type: { es: 'Trayectoria', en: 'Experience' },
      title: { es: 'Diseñador gráfico', en: 'Graphic Designer' },
      org: 'Frank T.V.',
      description: {
        es: 'Diseño gráfico para medios audiovisuales y proyectos comerciales.',
        en: 'Graphic design for audiovisual media and commercial projects.',
      },
    },
    {
      type: { es: 'Trayectoria', en: 'Experience' },
      title: { es: 'Servicio al cliente y digitación', en: 'Customer Service and Data Entry' },
      org: { es: 'Librería Juan Adrián', en: 'Juan Adrián Bookstore' },
      description: {
        es: 'Atención al cliente y digitación de información.',
        en: 'Customer assistance and data entry.',
      },
    },
    {
      type: { es: 'Trayectoria', en: 'Experience' },
      title: { es: 'Pizzero / ayudante de almacenista', en: 'Pizza Maker / Storekeeper’s Assistant' },
      org: { es: 'Restaurante Bolognia', en: 'Bolognia Restaurant' },
      description: {
        es: 'Preparación de pizzas y apoyo en las operaciones de almacén.',
        en: 'Pizza preparation and support in warehouse operations.',
      },
    },
  ],
};
