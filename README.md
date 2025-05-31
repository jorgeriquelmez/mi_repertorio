# mi_repertorio
 ![foto](https://github.com/jorgeriquelmez/imagenes/blob/main/captura_desafio_mirepertorio.png)

# Aplicación Full Stack para Gestión de Repertorio de Canciones

Aplicación Full Stack para gestionar un repertorio de canciones, con un backend RESTful en Node.js y un frontend interactivo.

## Tabla de Contenidos

1.  [Acerca del Proyecto](#acerca-del-proyecto)
2.  [Características](#características)
3.  [Tecnologías Utilizadas](#tecnologías-utilizadas)
4.  [Requisitos](#requisitos)
5.  [Instalación](#instalación)
6.  [Uso](#uso)
7.  [Endpoints de la API (Backend)](#endpoints-de-la-api-backend)

---

## 1. Acerca del Proyecto

Este proyecto es una aplicación web simple que permite a los usuarios gestionar un repertorio de canciones. Puedes añadir nuevas canciones, ver la lista completa, editar los detalles de una canción existente y eliminarla. Está desarrollado como una aplicación Full Stack con un backend en Node.js (Express) para la API y gestión de datos, y un frontend en HTML, CSS y JavaScript puro para la interfaz de usuario.

## 2. Características

* Visualización de todas las canciones en el repertorio.
* Creación de nuevas canciones.
* Edición de detalles de canciones existentes.
* Eliminación de canciones del repertorio.
* Persistencia de datos utilizando un archivo JSON (`repertorio.json`).
* API RESTful para la interacción entre el frontend y el backend.

## 3. Tecnologías Utilizadas

**Backend:**
* [Node.js](https://nodejs.org/es/)
* [Express.js](https://expressjs.com/) (Framework para el servidor web)
* [dotenv](https://www.npmjs.com/package/dotenv) (Para gestionar variables de entorno)
* File System (`fs`) y Path (`path`) de Node.js (Para lectura/escritura de archivos JSON)

**Frontend:**
* HTML5
* CSS3
* JavaScript (ES6+)

## 4. Requisitos

* [Node.js](https://nodejs.org/es/download/) (versión 18 o superior recomendada).
* [npm](https://docs.npmjs.com/cli/v8/commands/npm) (viene incluido con Node.js).

## 5. Instalación

Instrucciones paso a paso para configurar el proyecto localmente.

1.  **Clonar el repositorio:**
    ```bash
    git clone [git@github.com:jorgeriquelmez/mi_repertorio.git](git@github.com:jorgeriquelmez/mi_repertorio.git)
    cd mi_repertorio
    ```

2.  **Configurar el Backend:**
    * Navega al directorio del backend:
        ```bash
        cd Backend
        ```
    * Instala las dependencias:
        ```bash
        npm install
        ```
    * Crea un archivo `.env` en el directorio `Backend` (al mismo nivel que `server.js`) y añade tus variables de entorno. Puedes basarte en `.env.example`.
        ```
        PORT=5000
        ```
        *(Asegúrate de que `repertorio.json` esté presente en la carpeta `Backend` con un array JSON vacío `[]` o con algunos datos de ejemplo si quieres.)*

3.  **Configurar el Frontend:**
    * Navega al directorio del frontend:
        ```bash
        cd ../Frontend 
        ```
    * Instala las dependencias:
        ```bash
        npm install
        ```

## 6. Uso

Cómo ejecutar la aplicación una vez instalada.

1.  **Iniciar el Backend:**
    * Abre una nueva terminal.
    * Navega al directorio del backend (`Backend/`).
    * Ejecuta el servidor:
        ```bash
        node server.js
        ```
    * Verás un mensaje como: `Servidor escuchando en el puerto http://localhost:5000`.

2.  **Iniciar el Frontend:**
    * Abre otra nueva terminal.
    * Navega al directorio del frontend (`Frontend/`).
    * Ejecuta la aplicación de desarrollo del frontend:
        ```bash
        npm run dev
        ```
    * Abre esta URL en tu navegador `http://localhost:5000/`.

¡Ahora la aplicación debería estar funcionando!

## 7. Endpoints de la API (Backend)

**Base URL:** `http://localhost:5000` (o el puerto que hayas configurado)

| Método | Endpoint          | Descripción                                 | Cuerpo de Solicitud (Payload) | Respuesta (Ejemplo)                   |
| :----- | :---------------- | :------------------------------------------ | :------------------------------ | :------------------------------------ |
| `GET`  | `/canciones`      | Obtiene todas las canciones.                | N/A                             | `[ { id: 1, titulo: "...", ... } ]`  |
| `POST` | `/canciones`      | Añade una nueva canción.                    | `{ titulo: "...", artista: "...", tono: "..." }` | `{ id: 123, titulo: "...", ... }` (201 Created) |
| `PUT`  | `/canciones/:id`  | Actualiza una canción existente por su ID.  | `{ titulo: "...", artista: "...", ... }` | `{ id: 123, titulo: "...", ... }`     |
| `DELETE`| `/canciones/:id` | Elimina una canción existente por su ID.    | N/A                             | `(204 No Content)`                    |

