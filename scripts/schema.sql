-- =============================================================================
-- Schema PostgreSQL: ChayaGorelik + aplicación Next.js (propiedades)
-- Combinación de la base vieja (SQL Server) con la app de venta/alquiler
-- Ejecutar en PostgreSQL: psql -d tu_bd -f scripts/schema.sql
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Tablas de referencia (de ChayaGorelik, adaptadas a PostgreSQL)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS provincias (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS ciudades (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(100),
  provincia_id INT REFERENCES provincias(id)
);

CREATE TABLE IF NOT EXISTS monedas (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS operaciones (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS tipos (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(200)
);

-- -----------------------------------------------------------------------------
-- Usuarios (sesión admin con JWT - reemplaza CG_Usuarios)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Propiedades (CG_Propiedades + dormitorios, baños, metros_cuadrados, titulo)
-- tipo/operacion/moneda como texto para la app; provincia_id/ciudad_id opcionales
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  titulo VARCHAR(500),
  descripcion TEXT,
  tipo VARCHAR(100) NOT NULL,
  operacion VARCHAR(50) NOT NULL,
  direccion VARCHAR(500),
  precio DECIMAL(18, 2),
  moneda VARCHAR(10) DEFAULT 'USD',
  dormitorios INT DEFAULT 0,
  banos INT DEFAULT 0,
  metros_cuadrados DECIMAL(10, 2),
  destacado BOOLEAN DEFAULT FALSE,
  activo BOOLEAN DEFAULT TRUE,
  provincia_id INT REFERENCES provincias(id),
  ciudad_id INT REFERENCES ciudades(id),
  google_maps TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_properties_tipo ON properties(tipo);
CREATE INDEX IF NOT EXISTS idx_properties_operacion ON properties(operacion);
CREATE INDEX IF NOT EXISTS idx_properties_activo ON properties(activo);
CREATE INDEX IF NOT EXISTS idx_properties_codigo ON properties(codigo);

-- -----------------------------------------------------------------------------
-- Imágenes de propiedades (reemplaza CG_UbicacionImagenes; url completa)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS property_images (
  id SERIAL PRIMARY KEY,
  property_id INT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url VARCHAR(1000) NOT NULL,
  orden INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_property_images_property ON property_images(property_id);

-- -----------------------------------------------------------------------------
-- Slider del inicio (reemplaza CG_UbicacionSlider: rutas → URLs)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS slider_images (
  id SERIAL PRIMARY KEY,
  url VARCHAR(1000) NOT NULL,
  orden INT DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- Configuración de correo y mails de contacto (CG_ConfigMail, CG_Mails)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS config_mail (
  id SERIAL PRIMARY KEY,
  correo_destinatario VARCHAR(255),
  correo_copia VARCHAR(255),
  protocolo VARCHAR(50),
  correo_salida VARCHAR(255),
  clave_salida VARCHAR(255),
  puerto VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS contact_mails (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(255),
  asunto VARCHAR(255),
  cuerpo TEXT,
  fec_audi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- Datos iniciales (de ChayaGorelik)
-- =============================================================================

INSERT INTO provincias (id, descripcion) VALUES
  (1, 'Buenos Aires'), (2, 'Capital Federal'), (3, 'Catamarca'), (4, 'Chaco'),
  (5, 'Chubut'), (6, 'Córdoba'), (7, 'Corrientes'), (8, 'Entre Ríos'),
  (9, 'Formosa'), (10, 'Jujuy'), (11, 'La Pampa'), (12, 'La Rioja'),
  (13, 'Mendoza'), (14, 'Misiones'), (15, 'Neuquén'), (16, 'Río Negro'),
  (17, 'Salta'), (18, 'San Juan'), (19, 'San Luis'), (20, 'Santa Cruz'),
  (21, 'Santa Fé'), (22, 'Santiago del Estero'), (23, 'Tierra del Fuego'), (24, 'Tucumán')
ON CONFLICT (id) DO NOTHING;

SELECT setval('provincias_id_seq', (SELECT COALESCE(MAX(id), 1) FROM provincias));

INSERT INTO ciudades (id, descripcion, provincia_id) VALUES
  (1, 'Santa Fe', 21), (2, 'Santo Tomé', 21), (3, 'Rosario', 21)
ON CONFLICT (id) DO NOTHING;

SELECT setval('ciudades_id_seq', (SELECT COALESCE(MAX(id), 1) FROM ciudades));

INSERT INTO monedas (id, descripcion) VALUES (1, '$'), (2, 'USD')
ON CONFLICT (id) DO NOTHING;
SELECT setval('monedas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM monedas));

INSERT INTO operaciones (id, descripcion) VALUES
  (1, 'Compra/Venta'), (2, 'Alquiler')
ON CONFLICT (id) DO NOTHING;
SELECT setval('operaciones_id_seq', (SELECT COALESCE(MAX(id), 1) FROM operaciones));

INSERT INTO tipos (id, descripcion) VALUES
  (1, 'Departamento'), (2, 'Casa'), (3, 'Terreno'), (4, 'Galpón'),
  (5, 'Cochera'), (6, 'Oficina'), (7, 'Local Comercial'), (8, 'Quinta'),
  (9, 'Monoambiente'), (10, 'Duplex'), (11, 'Fondo comercio')
ON CONFLICT (id) DO NOTHING;
SELECT setval('tipos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM tipos));

-- Usuario admin: crear con script seed (contraseña admin123)
-- npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed-admin.ts

-- =============================================================================
-- Ejemplo: migrar propiedades viejas (opcional)
-- Si tenés datos en SQL Server, exportás a CSV o insertás manualmente.
-- Ejemplo de INSERT compatible con la app (tipo/operacion/moneda como texto):
--
-- INSERT INTO properties (codigo, titulo, descripcion, tipo, operacion, direccion, precio, moneda, destacado, activo, provincia_id, ciudad_id, google_maps)
-- SELECT
--   CodigoPropiedad,
--   LEFT(Descripcion, 200),
--   Descripcion,
--   (SELECT descripcion FROM tipos t WHERE t.id = p.IdTipo),
--   CASE WHEN IdOperacion = 1 THEN 'venta' ELSE 'alquiler' END,
--   Direccion,
--   Precio,
--   CASE WHEN IdMoneda = 2 THEN 'USD' ELSE 'ARS' END,
--   (Destacada = 'S'),
--   (FechaBaja IS NULL),
--   IdProvincia,
--   IdCiudad,
--   GoogleMaps
-- FROM CG_Propiedades p;  -- (solo si importaste CG_Propiedades temporalmente)
-- =============================================================================
--
-- Cómo ejecutar en PostgreSQL:
--   psql -U postgres -d nombre_de_tu_base -f scripts/schema.sql
-- O desde pgAdmin: abrir schema.sql y ejecutar (F5).
-- =============================================================================
