# @mfactory-beBe

✨ Repositorio de microservicios para el BE de Marketing factory ✨.

[Para mas información del proyecto](https://drive.google.com/drive/folders/1mg1IwDLbFx08-_CvaQtXMxfanDPqbXs4?usp=sharing)

## Para ejecutar localmente

Ejecute el siguiente comando en la terminal:

```sh
npm run serve
```

## Ejecutar tareas

Para ejecutar tareas con Nx, utiliza:

```sh
npx nx <objetivo> <nombre-del-proyecto>
```

Por ejemplo:

```sh
npx nx build miproyecto
```

Estos objetivos son [inferidos automáticamente](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) o definidos en los archivos `project.json` o `package.json`.

[Más sobre la ejecución de tareas en la documentación »](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Agregar nuevos proyectos

Aunque podrías agregar nuevos proyectos manualmente, es mejor aprovechar los [plugins de Nx](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) y su funcionalidad de [generación de código](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects).

Para instalar un nuevo plugin puedes usar el comando `nx add`. Por ejemplo, para agregar el plugin de React:

```sh
npx nx add @nx/react
```

Luego, usa el generador del plugin para crear nuevas aplicaciones o librerías:

```sh
# Generar una aplicación
npx nx g @nx/react:app demo

# Generar una librería
npx nx g @nx/react:lib alguna-lib
```

Puedes usar `npx nx list` para obtener una lista de plugins instalados. Luego, ejecuta `npx nx list <nombre-del-plugin>` para conocer más capacidades específicas de ese plugin. También puedes [instalar Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) para explorar plugins y generadores desde tu IDE.

[Más sobre los plugins de Nx »](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Explorar el registro de plugins »](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Aprende más sobre Nx en CI

[Guía para usar Nx con integración continua (CI)](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Instalar Nx Console

Nx Console es una extensión de editor que mejora tu experiencia como desarrollador. Te permite ejecutar tareas, generar código y mejora el autocompletado en tu IDE. Está disponible para VSCode e IntelliJ.

[Instalar Nx Console »](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Enlaces útiles

Aprende más:

- [Más sobre esta configuración de workspace](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Usar Nx en CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Publicar paquetes con Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [¿Qué son los plugins de Nx?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

Y únete a la comunidad de Nx:

- [Discord](https://go.nx.dev/community)
- [Síguenos en X (Twitter)](https://twitter.com/nxdevtools) o [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Nuestro canal de YouTube](https://www.youtube.com/@nxdevtools)
- [Nuestro blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)