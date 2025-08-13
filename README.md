# Marketing Factory

Monorepo para la aplicación Marketing Factory que contiene tanto el frontend (Next.js) como el backend (NestJS con arquitectura de microservicios usando NX).

## 🚀 Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone git@github.com:SebasMen/marketing-factory.git
cd marketing-factory

# 2. Instalar dependencias
npm install

# 3. Configurar el backend (ver SETUP.md para detalles)
cp packages/backend/.env.example packages/backend/.env
# Editar packages/backend/.env con tus configuraciones

# 4. Ejecutar en modo desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
marketing-factory/
├── packages/
│   ├── frontend/          # Aplicación Next.js con Canvas Editor
│   │   ├── src/canvas/    # Sistema de edición de canvas
│   │   ├── src/components/# Componentes UI con shadcn/ui
│   │   └── src/app/       # App Router de Next.js
│   └── backend/           # API NestJS con arquitectura NX
│       ├── apps/          # Microservicios (core, templates)
│       ├── libs/          # Librerías compartidas
│       └── dev-scripts/   # Scripts de desarrollo y DB
├── scripts/               # Scripts de utilidad del monorepo
├── package.json           # Configuración del workspace
├── SETUP.md              # Guía detallada de configuración
└── README.md             # Este archivo
```

## 🛠️ Tecnologías

### Frontend
- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Konva.js** - Canvas 2D para el editor
- **Zustand** - Gestión de estado
- **shadcn/ui** - Componentes UI

### Backend
- **NestJS** - Framework de Node.js
- **NX** - Herramientas de desarrollo para monorepos
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Azure AD** - Integración de autenticación
- **Swagger** - Documentación de API

## 📜 Scripts Disponibles

### Desarrollo
```bash
npm run dev              # Ejecuta ambos proyectos con concurrently
npm run dev:custom       # Ejecuta con script personalizado
npm run dev:frontend     # Solo frontend (puerto 3000)
npm run dev:backend      # Solo backend (puertos 3001, 3002)
```

### Construcción
```bash
npm run build            # Construye ambos proyectos
npm run build:frontend   # Solo frontend
npm run build:backend    # Solo backend
```

### Testing y Calidad
```bash
npm run test             # Tests de ambos proyectos
npm run lint             # Linting de ambos proyectos
```

### Utilidades
```bash
npm run clean            # Limpia node_modules y builds
npm run clean:install    # Limpia y reinstala dependencias
```

## 🔧 Configuración de Desarrollo

### Prerequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 12

### Variables de Entorno
Ver `SETUP.md` para configuración detallada de variables de entorno.

### VS Code (Recomendado)
El proyecto incluye configuración optimizada para VS Code:
- Configuración de workspace para TypeScript
- Extensiones recomendadas
- Configuración de ESLint y Prettier
- Soporte para monorepo

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend Core API**: http://localhost:3001
- **Backend Templates API**: http://localhost:3002
- **API Documentation**: http://localhost:3001/docs

## 📚 Arquitectura

### Frontend (Canvas Editor)
- **Editor de Canvas**: Sistema completo de edición visual
- **Componentes Reutilizables**: UI components con Tailwind
- **State Management**: Zustand para gestión de estado
- **Export Functionality**: Exportación a PDF usando jsPDF

### Backend (Microservicios)
- **Core Service**: Gestión de usuarios, autenticación, empresas
- **Templates Service**: Gestión de plantillas y contenido
- **Shared Libraries**: Código compartido entre servicios
- **Database**: Migraciones y entidades con TypeORM

## 🚀 Deployment

### Frontend
```bash
npm run build:frontend
npm run start:frontend
```

### Backend
```bash
npm run build:backend
# Configurar variables de entorno de producción
npm run start:backend
```

## 📖 Documentación Adicional

- [Guía de Configuración](./SETUP.md) - Configuración detallada
- [API Documentation](http://localhost:3001/docs) - Swagger docs
- [Frontend Components](./packages/frontend/README.md) - Componentes del canvas
- [Backend Architecture](./packages/backend/README.md) - Arquitectura del backend

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.
