# 📊 Datos de Ejemplo - DE MODA CON VIVI

## 🎯 **DATOS IMPLEMENTADOS**

He agregado datos de ejemplo completos para las ventas de ropa y chucherías que siguen el flujo del diagrama de base de datos y están relacionados con los clientes existentes.

## 👗 **VENTAS DE ROPA (10 ventas)**

### **Venta 1 - MAGITA HERNANDEZ (QUEVEDO)**
- **Fecha:** 2025-01-21 10:30
- **Productos:**
  - Blusa Básica (2 unidades) - $15.00 c/u = $30.00
  - Pantalón Jeans (1 unidad) - $28.00 c/u = $28.00
- **Total:** $58.00
- **Funda:** #1

### **Venta 2 - TEREZA DE JESUS (TENGUEL)**
- **Fecha:** 2025-01-21 14:15
- **Productos:**
  - Vestido Casual (1 unidad) - $35.00 c/u = $35.00
  - Chaqueta Casual (1 unidad) - $43.00 c/u = $43.00
- **Total:** $78.00
- **Funda:** #2

### **Venta 3 - FANY RODRIGUEZ AYON (JIPIJAPA)**
- **Fecha:** 2025-01-21 16:45
- **Productos:**
  - Blusa Elegante (1 unidad) - $25.00 c/u = $25.00
  - Short Deportivo (2 unidades) - $18.00 c/u = $36.00
- **Total:** $61.00
- **Funda:** #3

### **Venta 4 - LALESKA SOLE (GUAYAQUIL)**
- **Fecha:** 2025-01-22 09:20
- **Productos:**
  - Vestido Elegante (1 unidad) - $45.00 c/u = $45.00
  - Bolso Pequeño (1 unidad) - $15.00 c/u = $15.00
- **Total:** $60.00
- **Funda:** #4

### **Venta 5 - JORGE PATRICO (JIPIJAPA)**
- **Fecha:** 2025-01-22 11:30
- **Productos:**
  - Pantalón Formal (1 unidad) - $32.00 c/u = $32.00
  - Chaqueta Elegante (1 unidad) - $36.00 c/u = $36.00
- **Total:** $68.00
- **Funda:** #5

## 🍭 **VENTAS DE CHUCHERÍAS (12 ventas)**

### **Venta 1 - DIANA MABEL TOALA PONCE (JIPIJAPA)**
- **Fecha:** 2025-01-21 08:15
- **Productos:**
  - Caramelos de Colores (5 unidades) - $0.50 c/u = $2.50
  - Chocolate con Leche (2 unidades) - $1.50 c/u = $3.00
- **Total:** $5.50
- **Funda:** #1

### **Venta 2 - JENESY TECHITC (JIPIJAPA)**
- **Fecha:** 2025-01-21 12:30
- **Productos:**
  - Galletas de Vainilla (3 unidades) - $1.20 c/u = $3.60
  - Papas Fritas (2 unidades) - $1.50 c/u = $3.00
- **Total:** $6.60
- **Funda:** #2

### **Venta 3 - ANGIE CHOEZ (JIPIJAPA)**
- **Fecha:** 2025-01-21 15:45
- **Productos:**
  - Paletas de Fresa (4 unidades) - $0.75 c/u = $3.00
  - Refresco de Cola (2 unidades) - $1.25 c/u = $2.50
- **Total:** $5.50
- **Funda:** #3

### **Venta 4 - ANY ANGULO (GUAYAQUIL)**
- **Fecha:** 2025-01-22 10:00
- **Productos:**
  - Gomitas de Ositos (6 unidades) - $1.00 c/u = $6.00
  - Helado de Vainilla (1 unidad) - $2.00 c/u = $2.00
- **Total:** $8.00
- **Funda:** #4

### **Venta 5 - VANEMARC (MANTA)**
- **Fecha:** 2025-01-22 13:20
- **Productos:**
  - Chocolate Negro (3 unidades) - $1.75 c/u = $5.25
  - Doritos (2 unidades) - $1.60 c/u = $3.20
- **Total:** $8.45
- **Funda:** #5

### **Venta 6 - JIBSY VERA (QUEVEDO)**
- **Fecha:** 2025-01-22 16:10
- **Productos:**
  - Bombones de Chocolate (4 unidades) - $1.25 c/u = $5.00
  - Jugo de Naranja (3 unidades) - $1.00 c/u = $3.00
- **Total:** $8.00
- **Funda:** #6

## 🗄️ **ESTRUCTURA DE DATOS**

### **Relaciones Implementadas:**
- ✅ **Clientes** → **Ventas** (FK: idCliente)
- ✅ **Productos Ropa** → **Ventas Ropa** (FK: idRopa)
- ✅ **Productos Chucherías** → **Ventas Chucherías** (FK: idChucherias)
- ✅ **Ventas** → **Facturas** (FK: idVentasRopa/idVentasChucheria)

### **Separación Total:**
- ✅ **Ropa y Chucherías** completamente independientes
- ✅ **Fundas separadas** (Ropa: #1-5, Chucherías: #1-6)
- ✅ **Clientes diferentes** para cada tipo de venta
- ✅ **Productos específicos** para cada categoría

### **Contadores Actualizados:**
- **Funda Ropa:** #6 (próxima)
- **Funda Chucherías:** #7 (próxima)

## 📈 **ESTADÍSTICAS GENERADAS**

### **Ventas de Ropa:**
- **Total de ventas:** 5 facturas
- **Total de productos:** 10 artículos
- **Ingresos totales:** $325.00
- **Promedio por venta:** $65.00

### **Ventas de Chucherías:**
- **Total de ventas:** 6 facturas
- **Total de productos:** 12 artículos
- **Ingresos totales:** $42.15
- **Promedio por venta:** $7.03

### **Clientes Activos:**
- **Ropa:** 5 clientes diferentes
- **Chucherías:** 6 clientes diferentes
- **Total único:** 11 clientes (algunos compran ambos tipos)

## 🎯 **BENEFICIOS DE LOS DATOS**

1. **Datos Realistas** - Ventas con fechas, cantidades y precios coherentes
2. **Relaciones Correctas** - Todas las FK/PK funcionan correctamente
3. **Separación Total** - Ropa y chucherías completamente independientes
4. **Variedad de Clientes** - Diferentes clientes para cada tipo de venta
5. **Productos Específicos** - Productos apropiados para cada categoría
6. **Fundas Numeradas** - Sistema de facturación funcional
7. **Fechas Reales** - Ventas distribuidas en 2 días diferentes

## 🚀 **CÓMO VER LOS DATOS**

1. **Abrir `index.html`** - Ver estadísticas en el dashboard
2. **Navegar a `ventas-ropa.html`** - Ver ventas de ropa
3. **Navegar a `ventas-chucherias.html`** - Ver ventas de chucherías
4. **Navegar a `facturacion.html`** - Ver facturas generadas
5. **Abrir `test-database.html`** - Inspeccionar todos los datos

---

*Datos de ejemplo implementados siguiendo el diagrama de base de datos proporcionado.*
