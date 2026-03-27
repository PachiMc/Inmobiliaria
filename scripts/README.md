# Scripts de base de datos

## schema.sql

Schema unificado para PostgreSQL que combina:

- **ChayaGorelik (DB vieja SQL Server)**: provincias, ciudades, tipos, operaciones, monedas, estructura de propiedades, slider, config mail y mails de contacto.
- **Extensión para la app Next.js**: tabla `users` (JWT), `properties` con `dormitorios`, `banos`, `metros_cuadrados`, `titulo`, `property_images` con URL, y tablas opcionales `slider_images`, `config_mail`, `contact_mails`.

### Cómo ejecutarlo en PostgreSQL

```bash
# Desde la carpeta del proyecto (o con ruta absoluta al .sql)
psql -U tu_usuario -d nombre_de_tu_base -f scripts/schema.sql
```

En Windows (cmd):

```cmd
psql -U postgres -d mi_inmobiliaria -f scripts\schema.sql
```

Desde pgAdmin: abrir `schema.sql`, seleccionar la base de datos y ejecutar (F5 o botón Execute).

### Tablas creadas

| Tabla | Origen | Uso |
|-------|--------|-----|
| `provincias` | ChayaGorelik | Referencia (24 provincias) |
| `ciudades` | ChayaGorelik | Referencia (ej. Santa Fe, Rosario) |
| `monedas` | ChayaGorelik | $, USD |
| `operaciones` | ChayaGorelik | Compra/Venta, Alquiler |
| `tipos` | ChayaGorelik | Departamento, Casa, Terreno, etc. |
| `users` | App | Login admin (JWT) |
| `properties` | ChayaGorelik + app | Propiedades (codigo, titulo, tipo, operacion, dormitorios, banos, m², provincia_id, ciudad_id, google_maps, etc.) |
| `property_images` | App (reemplaza CG_UbicacionImagenes) | URLs de fotos por propiedad |
| `slider_images` | ChayaGorelik (CG_UbicacionSlider) | URLs para el slider del inicio |
| `config_mail` | ChayaGorelik | Configuración de envío de correo |
| `contact_mails` | ChayaGorelik | Registro de mails del formulario de contacto |

Después de ejecutar el schema, crear el usuario admin con el script de seed (ver raíz del proyecto).
