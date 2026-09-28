# Ejercicios Básicos de HTML II

Este repositorio contiene una carpeta llamada "ejercicios" donde encontrarás un archivo por cada ejercicio a realizar. Cada ejercicio incluye pruebas automatizadas para autocorrección y calificación automática.

## Configuración del Entorno de Desarrollo

### ¿Qué es un devcontainer?
Un devcontainer es un entorno de desarrollo en contenedor que garantiza que todos los estudiantes trabajen con las mismas herramientas y dependencias, independientemente de su sistema operativo local.

### Instalación de Docker

Antes de comenzar, necesitas tener Docker instalado en tu máquina:

#### Windows:
1. Descarga [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/)
2. Ejecuta el instalador y sigue las instrucciones
3. Reinicia tu computadora si es necesario
4. Verifica la instalación abriendo una terminal y ejecutando: `docker --version`

#### macOS:
1. Descarga [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop/)
2. Abre el archivo .dmg descargado y arrastra Docker a la carpeta de Aplicaciones
3. Inicia Docker Desktop desde Aplicaciones
4. Verifica la instalación abriendo una terminal y ejecutando: `docker --version`

#### Linux:
1. Sigue las instrucciones para tu distribución en [docs.docker.com](https://docs.docker.com/engine/install/)
2. Configura Docker para ejecutarse sin sudo (opcional pero recomendado)
3. Verifica la instalación ejecutando: `docker --version`

### Abrir el proyecto en un devcontainer

1. Asegúrate de tener **VS Code** instalado
2. Instala la extensión **Dev Containers** en VS Code
3. Abre este proyecto en VS Code
4. Cuando VS Code detecte la configuración del devcontainer, verás una notificación:
   - Haz clic en **"Reopen in Container"** (Reabrir en Contenedor)
   - O presiona `F1`, escribe "Dev Containers: Reopen in Container" y selecciona esa opción
5. Espera a que el contenedor se construya (la primera vez puede tomar varios minutos)
6. Una vez listo, estarás trabajando dentro del devcontainer con todas las herramientas necesarias

### Verificación
Para verificar que estás trabajando dentro del devcontainer:
- En la esquina inferior izquierda de VS Code deberías ver un ícono verde con el texto "Dev Container: ..."
- Abre una terminal en VS Code (Terminal > Nueva Terminal) y ejecuta: `node --version`

## Estructura del Proyecto

```
./
├── ejercicios/          # Ejercicios a realizar (instrucciones).
├── src/                # Carpeta donde crearás tus soluciones HTML.
│   └── index.html      # Página principal con enlaces a los ejercicios.
├── tests/              # Pruebas automatizadas (no tocar ni modificar nada).
├── .github/workflows/  # Configuración de GitHub Actions (no tocar ni modificar nada).
└── package.json        # Dependencias para las pruebas (no tocar ni modificar nada).
```

## Visualización con Live Server

Para ver tus ejercicios en tiempo real:

1. Asegúrate de tener la extensión **Live Server** instalada en VS Code
2. Abre el archivo `src/index.html` (página principal)
3. Haz clic derecho y selecciona "Open with Live Server"
4. Navega por los ejercicios usando los enlaces en la página principal
5. Alternativamente, puedes abrir directamente cualquier archivo HTML del ejercicio con Live Server

## Ejercicios

### Ejercicio 6: Uso de metadatos
Aprende a colocar y utilizar etiquetas de metadatos para documentar y mejorar la accesibilidad de tu página web. Los archivos deben crearse en `src/metadatos/`.

### Ejercicio 7: Metadatos y favicon
Aprende a utilizar metadatos y favicon para mejorar la apariencia de tu página web en navegadores y dispositivos. Los archivos deben crearse en `src/metadatos/`.

## Ejecución de Pruebas

Para ejecutar las pruebas localmente:

```bash
npm install
npm test
```

## Cómo Usar Este Repositorio

1. Clona el repositorio en tu máquina local o codespace.
2. Navega a la carpeta del proyecto.
3. Instala las dependencias ejecutando `npm install`.
4. Completa los ejercicios siguiendo las instrucciones en los archivos .md de cada ejercicio ubicados en la carpeta ejercicios.
5. Ejecuta las pruebas utilizando `npm test` para verificar tu trabajo.

¡Buena suerte y diviértete aprendiendo HTML!