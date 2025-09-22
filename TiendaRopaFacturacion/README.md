# 🏪 DE MODA CON VIVI - Sistema de Gestión de Tienda

Un sistema completo de gestión de ventas para tiendas de ropa y chucherías desarrollado con **HTML5**, **CSS3** y **JavaScript puro** (sin frameworks externos).

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Uso](#-instalación-y-uso)
- [Funcionalidades](#-funcionalidades)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [API y Funciones Principales](#-api-y-funciones-principales)
- [Personalización](#-personalización)
- [Soporte](#-soporte)

## ✨ Características

### 🎯 Funcionalidades Principales
- **Gestión Completa de Clientes** - Agregar, editar, eliminar y buscar clientes
- **Sistema de Ventas Dual** - Ventas de ropa y chucherías completamente separadas
- **Sistema de Fundas Automático** - Numeración automática para cada tipo de venta
- **Facturación Profesional** - Generación, impresión y exportación de facturas
- **Dashboard Interactivo** - Estadísticas en tiempo real y actividades recientes
- **Almacenamiento en Memoria** - Datos se reinician al cerrar la pestaña
- **Interfaz Responsiva** - Diseño adaptable para móviles, tablets y desktop

### 🚀 Características Avanzadas
- **Separación Total de Datos** - Ropa y chucherías completamente independientes
- **Búsqueda en Tiempo Real** - Filtros inteligentes por múltiples criterios
- **Auto-guardado** - Datos guardados automáticamente
- **Exportación de Datos** - Backup completo en formato JSON
- **Impresión de Recibos** - Facturas y recibos listos para imprimir
- **Modales Interactivos** - Visualización detallada de artículos
- **Notificaciones** - Sistema de alertas para todas las acciones
- **Datos Temporales** - Perfecto para pruebas y demostraciones

## 📁 Estructura del Proyecto

```
TiendaRopaFacturacion/
│
├── index.html                    # Página principal con dashboard
├── clientes.html                 # Gestión de clientes
├── ventas-ropa.html              # Ventas de ropa
├── ventas-chucherias.html        # Ventas de chucherías
├── facturacion.html              # Sistema de facturación
├── test-database.html            # Página de pruebas
│
├── css/
│   └── style.css                 # Estilos principales (2700+ líneas)
│
├── js/
│   ├── database.js               # Gestor principal de base de datos
│   ├── dropdown.js               # Navegación dropdown
│   ├── clientes.js               # Gestión de clientes
│   ├── ventas-ropa.js            # Sistema de ventas de ropa
│   ├── ventas-chucherias.js      # Sistema de ventas de chucherías
│   ├── facturacion.js            # Facturación y reportes
│   └── index.js                  # Dashboard y estadísticas
│
├── assets/
│   └── logo.png                  # Logo de la aplicación
│
├── img/
│   ├── logo.jpg                  # Logo principal
│   └── image.png                 # Imagen adicional
│
├── README.md                     # Documentación principal
└── ESTRUCTURA.md                 # Estructura del proyecto
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor web
- Funciona completamente offline
- **Los datos se reinician al cerrar la pestaña** (perfecto para pruebas)

### Instalación
1. **Descargar** o clonar el proyecto
2. **Abrir** `index.html` en cualquier navegador
3. **¡Listo!** La aplicación se inicializa automáticamente

### Primer Uso
1. La aplicación incluye **clientes de ejemplo** pre-cargados
2. Puedes comenzar registrando ventas de ropa o chucherías inmediatamente
3. **Los datos se mantienen solo mientras la pestaña esté abierta**
4. Al cerrar la pestaña o reiniciar el servidor, todo se reinicia automáticamente
5. Cada sección mantiene sus datos completamente separados

### ⚠️ Solución de Problemas
Si encuentras el error "Cannot GET ventas.html":
1. **Presiona `Ctrl + F5`** para forzar la recarga
2. O abre `force-refresh.html` para una solución automática
3. El archivo `ventas.html` ahora redirige automáticamente a las páginas correctas

## 🎮 Funcionalidades

### 🏠 Dashboard Principal
- **Estadísticas en Tiempo Real**
  - Total de clientes registrados
  - Ventas del día
  - Total de fundas generadas
  - Ingresos del mes
  - Artículos vendidos
  - Cliente más frecuente
  - Promedio por venta

- **Navegación Dual**
  - Acceso directo a ventas de ropa
  - Acceso directo a ventas de chucherías
  - Gestión de clientes unificada
  - Sistema de facturación completo

### 👥 Gestión de Clientes

#### Clientes Pre-cargados
- **MAGITA HERNANDEZ** (QUEVEDO) - Tel: 0987654321
- **TEREZA DE JESUS** (TENGUEL) - Tel: 0987654321
- **FANY RODRIGUEZ AYON** (JIPIJAPA) - Tel: 0976543210
- **LALESKA SOLE** (GUAYAQUIL) - Tel: 0987654321
- **JORGE PATRICO** (JIPIJAPA) - Tel: 0954321098
- **DIANA MABEL TOALA PONCE** (JIPIJAPA) - Tel: 0987654321
- **JENESY TECHITC** (JIPIJAPA) - Tel: 0932109876
- **ANGIE CHOEZ** (JIPIJAPA) - Tel: 0987654321
- **ANY ANGULO** (GUAYAQUIL) - Tel: 0910987654
- **VANEMARC** (MANTA) - Tel: 0987654321
- **JIBSY VERA** (QUEVEDO) - Tel: 0898765432
- **MARICIELA VANESSA** (ROCAFUERTE) - Tel: 0987654321
- **VANESSA BANGUERA** (QUITO) - Tel: 0876543210
- **EMILIA GE** (BAHIA DE CARAQUEZ) - Tel: 0987654321

#### Funcionalidades
- ✅ **Agregar nuevos clientes** con validación completa
- ✅ **Editar información** de clientes existentes
- ✅ **Eliminar clientes** (con validación de ventas asociadas)
- ✅ **Búsqueda en tiempo real** por nombre, ciudad, teléfono, email
- ✅ **Filtros por ciudad** con dropdown dinámico
- ✅ **Ordenamiento** por cualquier columna
- ✅ **Validación de datos** (nombre y ciudad obligatorios)
- ✅ **Ver ventas asociadas** a cada cliente

### 🛍️ Sistema de Ventas Dual

#### 👗 Ventas de Ropa
- **Categorías Disponibles:**
  - Blusas (Básica, Elegante, Casual, de Trabajo)
  - Vestidos (Casual, Elegante, de Fiesta, de Verano)
  - Pantalones (Jeans, Formal, Casual, de Trabajo)
  - Shorts (Deportivo, Casual, Elegante)
  - Chaquetas (Casual, Elegante, de Cuero, de Invierno)
  - Buzos (con Capucha, Básico, Deportivo)
  - Interiores (Conjunto, Básica, Elegante)
  - Accesorios (Bolsos, Cinturón, Bufanda)

#### 🍭 Ventas de Chucherías
- **Categorías Disponibles:**
  - Dulces (Caramelos, Paletas, Gomitas, Bombones)
  - Chocolates (con Leche, Negro, Blanco, con Almendras)
  - Galletas (Vainilla, Chocolate, Avena, Mantequilla)
  - Snacks (Papas Fritas, Doritos, Cheetos, Pretzels)
  - Bebidas (Refrescos, Jugos, Agua, Té Helado)
  - Helados (Vainilla, Chocolate, Fresa, Limón)
  - Gomas (Frutas, Ositos, Gusano, Corazón)
  - Otros (Palomitas, Algodón, Mazapán, Turrón)

#### Características del Sistema de Fundas
- **Numeración Automática** - Cada tipo de venta genera fundas únicas
- **Múltiples Artículos** - Una funda puede contener varios artículos
- **Cliente Único** - Cada funda pertenece a un solo cliente
- **Cálculo Automático** - Total se calcula automáticamente
- **Datos Separados** - Ropa y chucherías completamente independientes

#### Funcionalidades Comunes
- ✅ **Selección de cliente** desde dropdown
- ✅ **Modal de artículos** con categorías específicas
- ✅ **Agregar artículos** con descripción y precio
- ✅ **Eliminar artículos** de la venta actual
- ✅ **Auto-guardado** automático
- ✅ **Finalizar venta** y generar funda
- ✅ **Ver detalles** de artículos en modal
- ✅ **Impresión de recibos** en tiempo real

### 📋 Sistema de Facturación

#### Funcionalidades
- ✅ **Lista completa** de todas las ventas
- ✅ **Datos quemados** de ejemplo para demostración
- ✅ **Filtros avanzados**:
  - Por rango de fechas
  - Por número de funda
  - Por cliente específico
- ✅ **Estadísticas resumidas**:
  - Total de ventas
  - Ingresos totales
  - Artículos vendidos
  - Clientes únicos
- ✅ **Vista detallada** de cada factura
- ✅ **Impresión individual** y masiva
- ✅ **Exportación** en formato JSON
- ✅ **Eliminación** de ventas (con confirmación)

#### Datos de Ejemplo Incluidos
- **Funda 1** - MAGITA HERNANDEZ (QUEVEDO)
  - Blusa Básica - $15.00
  - Pantalón Jeans - $28.00
  - **Total:** $43.00

- **Funda 2** - TEREZA DE JESUS (TENGUEL)
  - Vestido Elegante - $45.00
  - Chaqueta de Cuero - $65.00
  - Bolso Pequeño - $15.00
  - **Total:** $125.00

## 💻 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con:
  - Variables CSS (Custom Properties)
  - Flexbox y Grid Layout
  - Animaciones y transiciones
  - Diseño responsivo
  - Gradientes y sombras
  - Modales y overlays
- **JavaScript ES6+** - Lógica de aplicación con:
  - Clases y módulos
  - Async/await
  - LocalStorage API
  - DOM manipulation
  - Event handling
  - Separación de datos independiente

### Características Técnicas
- **Sin Frameworks** - JavaScript puro para máximo rendimiento
- **Modular** - Código organizado en archivos específicos
- **Responsive** - Adaptable a todos los dispositivos
- **Offline First** - Funciona sin conexión a internet
- **Persistent** - Datos guardados localmente
- **Cross-browser** - Compatible con todos los navegadores modernos
- **Independiente** - Sistemas separados para diferentes tipos de productos

## 🔧 API y Funciones Principales

### Clase TiendaApp (app.js)
```javascript
// Inicialización
const app = new TiendaApp();

// Gestión de clientes
app.addClient(clientData);
app.updateClient(id, clientData);
app.deleteClient(id);
app.getClientById(id);
app.searchClients(query);

// Gestión de ventas (separada por tipo)
app.getSales(tipo = 'ropa'); // 'ropa' o 'chucherias'
app.saveSales(sales, tipo = 'ropa');

// Estadísticas
app.getStats();
app.updateStats();

// Utilidades
app.exportAllData();
app.formatCurrency(amount);
app.showNotification(message, type);
```

### Clase VentasRopaIndependiente (ventas-ropa-independiente.js)
```javascript
// Gestión de ventas de ropa
ventasRopaIndependiente.handleAddSale(event);
ventasRopaIndependiente.showArticulosModal();
ventasRopaIndependiente.toggleCategoria(categoria);
ventasRopaIndependiente.addArticulo(nombre, precio);
ventasRopaIndependiente.viewArticulos(saleId);

// Modales
ventasRopaIndependiente.showAddSaleModal();
ventasRopaIndependiente.editSale(saleId);
ventasRopaIndependiente.deleteSale(saleId);
```

### Clase VentasChucheriasIndependiente (ventas-chucherias-independiente.js)
```javascript
// Gestión de ventas de chucherías
ventasChucheriasIndependiente.handleAddSale(event);
ventasChucheriasIndependiente.showArticulosModal();
ventasChucheriasIndependiente.toggleCategoria(categoria);
ventasChucheriasIndependiente.addArticulo(nombre, precio);
ventasChucheriasIndependiente.viewArticulos(saleId);

// Modales
ventasChucheriasIndependiente.showAddSaleModal();
ventasChucheriasIndependiente.editSale(saleId);
ventasChucheriasIndependiente.deleteSale(saleId);
```

### Clase FacturacionManager (facturacion.js)
```javascript
// Filtros
facturacionManager.applyFilters();
facturacionManager.clearFilters();

// Renderizado
facturacionManager.renderSales();
facturacionManager.renderSaleCard(sale);

// Impresión
facturacionManager.printSale(saleId);
facturacionManager.printAllSales();
facturacionManager.generateInvoiceHTML(sale);

// Exportación
facturacionManager.exportAllData();
```

## 🎨 Personalización

### Colores y Temas
Modifica las variables CSS en `css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
}
```

### Datos Iniciales
Edita los clientes pre-cargados en `js/app.js`:
```javascript
const INITIAL_DATA = {
    clients: [
        { id: 1, name: "Tu Cliente", city: "Tu Ciudad", ... }
    ]
};
```

### Configuración
Ajusta la configuración en `js/app.js`:
```javascript
const CONFIG = {
    DEFAULT_CURRENCY: '$',
    DATE_FORMAT: 'DD/MM/YYYY',
    ITEMS_PER_PAGE: 10,
    MAX_RECENT_ACTIVITIES: 5
};
```

## 🔒 Separación de Datos

### Almacenamiento Independiente
- **Ropa:** `tienda_ropa_sales_ropa_independiente`
- **Chucherías:** `tienda_ropa_sales_chucherias_independiente`
- **Clientes Ropa:** `tienda_ropa_clients_ropa_independiente`
- **Clientes Chucherías:** `tienda_ropa_clients_chucherias_independiente`
- **Configuración Ropa:** `tienda_ropa_settings_ropa_independiente`
- **Configuración Chucherías:** `tienda_ropa_settings_chucherias_independiente`

### Ventajas de la Separación
- **Sin interferencia** entre tipos de productos
- **Datos independientes** para cada sección
- **Escalabilidad** para agregar más tipos de productos
- **Mantenimiento** más fácil y organizado

## 🚀 Rendimiento

- **Carga Rápida** - Sin dependencias externas
- **Responsive** - Optimizado para todos los dispositivos
- **Eficiente** - Uso mínimo de memoria y CPU
- **Offline** - Funciona sin conexión a internet
- **Cache Busting** - Actualizaciones automáticas
- **Datos Optimizados** - Almacenamiento eficiente por separado

## 🐛 Solución de Problemas

### Problemas Comunes

**Los datos no se guardan**
- Verificar que el navegador soporte localStorage
- Comprobar espacio disponible en el navegador

**La interfaz no se ve bien**
- Actualizar el navegador a la última versión
- Verificar que JavaScript esté habilitado

**No se pueden imprimir facturas**
- Verificar configuración de impresión del navegador
- Comprobar que no haya bloqueadores de pop-ups

**Datos mezclados entre ropa y chucherías**
- Usar `fix-chucherias.html` para limpiar datos
- Verificar que se estén usando los archivos independientes

### Herramientas de Diagnóstico
- **`test-chucherias-independiente.html`** - Diagnóstico de chucherías
- **`fix-chucherias.html`** - Limpieza de datos compartidos
- **`force-fix.html`** - Herramienta completa de corrección

### Limpieza de Datos
Para resetear la aplicación:
```javascript
// En la consola del navegador
localStorage.clear();
location.reload();
```

## 📊 Estructura de Datos

### Cliente
```javascript
{
    id: number,
    name: string,
    city: string,
    phone: string,
    address: string,
    email: string,
    createdAt: string,
    updatedAt: string
}
```

### Venta de Ropa
```javascript
{
    id: number,
    funda: number,
    clientId: number,
    articulos: Array<{
        nombre: string,
        precio: number
    }>,
    total: number,
    fecha: string,
    createdAt: string
}
```

### Venta de Chucherías
```javascript
{
    id: number,
    funda: number,
    clientId: number,
    articulos: Array<{
        nombre: string,
        precio: number
    }>,
    total: number,
    fecha: string,
    createdAt: string
}
```

## 📈 Roadmap Futuro

### Versión 2.0
- [ ] **Más tipos de productos** - Zapatos, accesorios, etc.
- [ ] **Inventario** - Control de stock de productos
- [ ] **Reportes avanzados** - Gráficos y estadísticas detalladas
- [ ] **Base de datos** - Integración con backend
- [ ] **Multi-usuario** - Sistema de autenticación

### Versión 3.0
- [ ] **App móvil** - Versión nativa para iOS/Android
- [ ] **Sincronización** - Cloud sync entre dispositivos
- [ ] **Analytics** - Análisis avanzado de ventas
- [ ] **Integración** - Con sistemas de pago y contabilidad

## 📞 Soporte

### Documentación
- **Código comentado** - Todas las funciones tienen documentación
- **Estructura clara** - Archivos organizados por funcionalidad
- **Ejemplos incluidos** - Datos de prueba pre-cargados
- **Herramientas de debug** - Archivos de diagnóstico incluidos

### Contacto
Para soporte técnico o sugerencias:
- Revisar la documentación del código
- Verificar la consola del navegador para errores
- Comprobar compatibilidad del navegador
- Usar las herramientas de diagnóstico incluidas

## 📄 Licencia

Este proyecto está desarrollado como un prototipo funcional para gestión de ventas de ropa y chucherías. Es de uso libre para fines educativos y comerciales.

## 🙏 Agradecimientos

- **HTML5** - Por la semántica y accesibilidad
- **CSS3** - Por las capacidades de diseño moderno
- **JavaScript** - Por la potencia del lenguaje nativo
- **LocalStorage API** - Por la persistencia de datos
- **Comunidad Web** - Por las mejores prácticas utilizadas

---

## 🎯 Resumen Ejecutivo

**DE MODA CON VIVI - Sistema de Gestión de Tienda** es una aplicación web completa desarrollada con tecnologías estándar (HTML, CSS, JavaScript) que proporciona:

✅ **Gestión completa de clientes** con datos pre-cargados  
✅ **Sistema de ventas dual** (ropa y chucherías) completamente separado  
✅ **Facturación profesional** con impresión y exportación  
✅ **Dashboard interactivo** con estadísticas en tiempo real  
✅ **Diseño responsivo** para todos los dispositivos  
✅ **Almacenamiento local independiente** sin necesidad de servidor  
✅ **Código modular** y bien documentado  
✅ **100% funcional** desde el primer uso  
✅ **Datos de ejemplo** para demostración inmediata  
✅ **Herramientas de diagnóstico** incluidas  

**Ideal para**: Pequeñas y medianas tiendas de ropa y chucherías que necesitan un sistema de gestión simple, eficiente y profesional.

**Tecnología**: Sin frameworks, JavaScript puro, máximo rendimiento y compatibilidad.

**Instalación**: Solo abrir `index.html` en cualquier navegador moderno.

**Características únicas**: Separación total de datos entre tipos de productos, sistemas independientes, y herramientas de diagnóstico incluidas.

---

*Desarrollado con ❤️ para la gestión eficiente de ventas de ropa y chucherías*