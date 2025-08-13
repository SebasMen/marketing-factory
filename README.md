# Marketing Factory

Monorepo para la aplicación Marketing Factory que contiene tanto el frontend (Next.js) como el backend (NestJS).

## Estructura del Proyecto

```
marketing-factory/
├── packages/
│   ├── frontend/          # Aplicación Next.js
│   └── backend/           # API NestJS con NX
├── package.json           # Configuración del workspace
└── README.md
```

## Prerequisitos

- Node.js >= 18.0.0
- npm >= 8.0.0

## Instalación

```bash
# Instalar todas las dependencias
npm install
```

## Desarrollo

```bash
# Ejecutar ambos proyectos en paralelo
npm run dev

# Ejecutar solo el backend
npm run dev:backend

# Ejecutar solo el frontend
npm run dev:frontend
```

## Build

```bash
# Build de ambos proyectos
npm run build

# Build solo del backend
npm run build:backend

# Build solo del frontend
npm run build:frontend
```

## Testing

```bash
# Ejecutar tests de ambos proyectos
npm run test
```

## Linting

```bash
# Ejecutar linting en ambos proyectos
npm run lint
```

## Estructura de Workspaces

Este proyecto utiliza npm workspaces para manejar las dependencias de manera eficiente:

- `@marketing-factory/frontend` - Aplicación React con Next.js
- `@marketing-factory/backend` - API REST con NestJS y TypeORM

## Scripts Disponibles

- `npm run dev` - Ejecuta ambos proyectos en modo desarrollo
- `npm run build` - Compila ambos proyectos para producción
- `npm run start` - Ejecuta ambos proyectos compilados
- `npm run test` - Ejecuta las pruebas de ambos proyectos
- `npm run lint` - Ejecuta el linting en ambos proyectos

## Configuración de Desarrollo

### VS Code
El proyecto incluye configuración optimizada para VS Code en `.vscode/`:
- Configuración de TypeScript workspace
- Recomendaciones de extensiones
- Configuración de ESLint y Prettier

### Recomendaciones
- Usar VS Code como editor principal
- Instalar las extensiones recomendadas
- Configurar Prettier como formateador por defecto
