# Docker Setup para Vuetify CVE 2025-1461

## Prerrequisitos

- Docker Desktop instalado en tu sistema
- Docker Compose (incluido con Docker Desktop)

## Instrucciones para levantar el proyecto

### Opción 1: Usando Docker Compose (Recomendado)

1. **Construir y levantar el contenedor:**
   ```bash
   docker-compose up --build
   ```

2. **Acceder a la aplicación:**
   Abre tu navegador y ve a: `http://localhost:3000`

3. **Parar el contenedor:**
   ```bash
   docker-compose down
   ```

### Opción 2: Usando Docker directamente

1. **Construir la imagen:**
   ```bash
   docker build -t vuetify-cve-app .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -p 3000:3000 -v ${PWD}:/app -v /app/node_modules vuetify-cve-app
   ```

## Comandos útiles

- **Ver logs del contenedor:**
  ```bash
  docker-compose logs -f
  ```

- **Ejecutar comandos dentro del contenedor:**
  ```bash
  docker-compose exec vuetify-app npm install nueva-dependencia
  ```

- **Reconstruir sin caché:**
  ```bash
  docker-compose build --no-cache
  ```

## Estructura de archivos Docker

- `Dockerfile` - Configuración de la imagen Docker
- `docker-compose.yml` - Configuración de servicios Docker Compose
- `.dockerignore` - Archivos a excluir al construir la imagen

## Configuración

- **Puerto:** 3000 (configurable en docker-compose.yml)
- **Hot reload:** Habilitado con volumes mounting
- **Node.js:** Versión 16 Alpine Linux
