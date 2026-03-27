# Landing Propiedades

Este proyecto es una aplicación web de Next.js para mostrar propiedades inmobiliarias.

## Requisitos

- Docker y Docker Compose instalados.
- Copia `.env.example` a `.env` y ajusta las variables de entorno.

## Variables de Entorno

Copia `.env.example` a `.env` y configura:

- `DATABASE_URL`: URL de conexión a PostgreSQL.
- `POSTGRES_PASSWORD`: Contraseña para PostgreSQL.
- `JWT_SECRET`: Clave secreta para JWT.
- `NEXT_PUBLIC_WHATSAPP`: Número de WhatsApp.

Para Docker, la `DATABASE_URL` se sobrescribe automáticamente para apuntar al contenedor de PostgreSQL.

## Ejecutar con Docker

1. Asegúrate de que Docker Desktop esté ejecutándose.

2. Construye y ejecuta los contenedores:

   ```bash
   docker-compose up --build
   ```

3. La aplicación estará disponible en `http://localhost:3000`.

4. PostgreSQL en `localhost:5432`.

## Desarrollo Local

Si prefieres desarrollo local sin Docker:

1. Instala Node.js y PostgreSQL.

2. Configura `.env` con la URL local de PostgreSQL.

3. Ejecuta:

   ```bash
   npm install
   npm run dev
   ```

## Troubleshooting

- Si hay errores de conexión a la base de datos, verifica que PostgreSQL esté saludable (espera el healthcheck).
- Asegúrate de que el puerto 3000 y 5432 no estén en uso.
- Para reconstruir imágenes: `docker-compose build --no-cache`.