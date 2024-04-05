# OMDB API MOVIES/SERIES

Este es un proyecto [Next.js](https://nextjs.org/) iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Empezando

Para utilizar este proyecto, primero necesitas obtener una API Key del OMDb API.

### Obtener una API Key de OMDb

1. Visita [OMDb API](http://www.omdbapi.com/) y haz clic en el enlace "API Key".
2. Rellena el formulario para solicitar una API Key.
3. Recibirás tu API Key por correo electrónico. Guárdala, ya que la necesitarás para configurar el proyecto.

### Configuración del proyecto

Antes de ejecutar la aplicación, se necesita configurar tu entorno:

1. Crear un archivo `.env` en la raíz del proyecto.
2. Añadir  API Key de OMDb al archivo como sigue:

   ```env
   NEXT_PUBLIC_OMDB_API_KEY=tu_api_key_aquí
   ```

### Ejecutar el servidor de desarrollo

Ahora, puedes arrancar el servidor de desarrollo:
```
yarn dev
```

Abre http://localhost:3000 en tu navegador para ver el resultado.

Ejecutar tests
Para ejecutar los tests, usa el siguiente comando:
```
yarn run test
```