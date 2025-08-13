# Guía de Configuración - Marketing Factory

## 🎯 Configuración Inicial

### 1. Variables de Entorno del Backend

Copia el archivo de ejemplo y configura las variables:

```bash
cp packages/backend/.env.example packages/backend/.env
```

Edita `packages/backend/.env` con tus valores reales:

- **Base de Datos**: Configura PostgreSQL (host, puerto, nombre, usuario, contraseña)
- **JWT**: Genera claves secretas seguras
- **Azure AD**: Si usas autenticación con Azure

### 2. Base de Datos

Asegúrate de tener PostgreSQL corriendo y crea la base de datos:

```sql
CREATE DATABASE marketing_factory_db;
```

### 3. Migraciones del Backend

Una vez configurada la base de datos, ejecuta las migraciones:

```bash
cd packages/backend
npm run export:env  # Exporta las variables de entorno
./dev-scripts/executeMigrations.sh
```

## 🚀 Comandos de Desarrollo

### Ejecutar Ambos Proyectos
```bash
npm run dev                 # Con concurrently
npm run dev:custom         # Con script personalizado
```

### Ejecutar Proyectos Individualmente
```bash
npm run dev:frontend       # Solo frontend en puerto 3000
npm run dev:backend        # Solo backend (requiere configuración de DB)
```

### Construcción para Producción
```bash
npm run build              # Ambos proyectos
npm run build:frontend     # Solo frontend
npm run build:backend      # Solo backend
```

### Testing y Linting
```bash
npm run test               # Tests de ambos proyectos
npm run lint               # Linting de ambos proyectos
```

### Limpieza
```bash
npm run clean              # Limpia node_modules y dist
npm run clean:install      # Limpia y reinstala
```

## 📁 Estructura del Workspace

```
marketing-factory/
├── packages/
│   ├── frontend/          # Next.js App (@marketing-factory/frontend)
│   └── backend/           # NestJS API (@marketing-factory/backend)
├── scripts/               # Scripts de utilidad
├── package.json           # Configuración del workspace raíz
└── README.md
```

## 🔧 Configuración de VS Code

El proyecto incluye configuración optimizada para VS Code:

- `.vscode/settings.json` - Configuración del workspace
- `.vscode/extensions.json` - Extensiones recomendadas

### Extensiones Recomendadas:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Thunder Client (para testing de APIs)

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend Core**: http://localhost:3001 (configurar en .env)
- **Backend Templates**: http://localhost:3002 (configurar en .env)

## 📝 Notas Importantes

1. **Lockfiles**: Solo usa el `package-lock.json` del directorio raíz
2. **Variables de Entorno**: Cada proyecto mantiene su propio `.env`
3. **Ports**: Asegúrate de que no haya conflictos de puertos
4. **Database**: El backend requiere PostgreSQL configurado

## 🐛 Solución de Problemas

### Error: "Config validation error"
- Verifica que el archivo `.env` del backend esté configurado
- Asegúrate de que todas las variables requeridas estén presentes

### Error: "EADDRINUSE"
- Verifica que los puertos no estén siendo usados por otros procesos
- Cambia los puertos en la configuración si es necesario

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Confirma las credenciales en el archivo `.env`
- Asegúrate de que la base de datos exista

### Error de Turbopack en Frontend
- Ejecuta `npm run clean:install`
- Verifica que no haya lockfiles duplicados
