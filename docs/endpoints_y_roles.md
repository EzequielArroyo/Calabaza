# Endpoints y Rutas de la Aplicación Calabaza

Este documento detalla todas las rutas, páginas, Server Actions y endpoints API de la plataforma **Calabaza**, junto con los niveles de acceso y roles requeridos (`public`, `customer`, `store_owner`, `admin`).

---

## 🌐 1. Rutas Públicas y Módulo Cliente (`public` / `customer`)

Esta sección abarca las vistas de navegación pública libre para cualquier visitante, así como las rutas y acciones exclusivas para usuarios clientes autenticados.

| Ruta / Endpoint | Tipo / Método | Permiso / Rol | Descripción / Propósito |
| :--- | :--- | :--- | :--- |
| `/` | Page (RSC) | Público (`public`) | Home pública. Muestra la lista y buscador de productos ordenados por cercanía. |
| `/products/[id]` | Page (RSC) | Público (`public`) | Detalle de un producto en particular (precio, descripción, stock, comercio). |
| `/shop/[slug]` | Page (RSC) | Público (`public`) | Muestra la vitrina/perfil exclusivo de una tienda en particular. |
| `/cart` | Page (Client) | `customer` | Vista del carrito de compras (restringido a productos de una sola tienda). |
| `/orders` | Page (RSC) | `customer` | Historial de reservas e intenciones de compra del cliente. |
| `/orders/[id]` | Page (Client) | `customer` | Detalle de la reserva (código de retiro, dirección del local, total a abonar en tienda). |
| `/onboarding/store` <br>*(alt: `/profile/store/new` o `/store/new`)* | Page (Client / RSC) | `customer` *(Usuario autenticado sin tienda)* | Formulario para que un usuario cree/registre su propia tienda (nombre, descripción, dirección y coordenadas GPS). Al crearla, se le asigna el rol `store_owner`. |
| `confirmReservation()` | Server Action | `customer` | Reserva el stock de los ítems y genera la orden en estado `Pending` (con validez de 48 horas). |
| `cancelOrder(id)` | Server Action | `customer` | Cancela una reserva siempre que la orden esté en estado `Pending` o `Preparing`. |

---

## 🏪 2. Módulo Comercio / Negocio (`store_owner`)

Rutas para los dueños de negocios destinados a gestionar su catálogo, inventario y solicitudes de reserva.

| Ruta / Endpoint | Tipo / Método | Permiso / Rol | Descripción / Propósito |
| :--- | :--- | :--- | :--- |
| `/dashboard` | Page (RSC) | `store_owner` | Resumen de métricas principales del comercio (ventas, productos bajos de stock, pedidos pendientes). Redirige a `/onboarding/store` si el usuario no posee tienda. |
| `/dashboard/products` | Page (RSC) | `store_owner` | Gestión e inventario de productos de la tienda. |
| `/dashboard/products/new` | Page (Client) | `store_owner` | Formulario para el alta de un nuevo producto. |
| `/dashboard/orders` | Page (RSC) | `store_owner` | Lista de reservas recibidas agrupadas por estado. |
| `/dashboard/orders/[id]` | Page (Client) | `store_owner` | Detalle de la reserva para cambiar estado (`LISTO_PARA_RETIRAR` o `ENTREGADO`) y notificar al cliente. |

---

## 👑 3. Módulo Administrador (`admin`)

Rutas de control global del sistema reservadas exclusivamente al perfil administrador.

| Ruta / Endpoint | Tipo / Método | Permiso / Rol | Descripción / Propósito |
| :--- | :--- | :--- | :--- |
| `/admin` | Page (RSC) | `admin` | Resumen general con métricas globales de la plataforma (`getGlobalMetrics()`). |
| `/admin/shops` | Page (RSC) | `admin` | Alta, habilitación y administración de las tiendas en la plataforma (`getAllShops()`, `createShop()`). |
| `/admin/users` | Page (RSC) | `admin` | Gestión global de cuentas de usuario y asignación/cambio de roles (`getAllUsers()`, `updateUserRole()`). |

---

## 🔌 4. Endpoints Internos y API (`public` / `store_owner` / `admin`)

Endpoints de la capa API (`app/api`) para integración de servicios auxiliares y autenticación.

| Ruta API | Método | Permiso / Rol | Descripción / Propósito |
| :--- | :--- | :--- | :--- |
| `/api/auth/[...nextauth]` | GET / POST | Público (`public`) | Endpoints internos para el manejo de sesiones y autenticación (Auth.js / NextAuth). |
| `/api/upload` | POST | `store_owner` / `admin` | Subida de imágenes de productos al servicio de almacenamiento en la nube (Cloudinary / S3). |
