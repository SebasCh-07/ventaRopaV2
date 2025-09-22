# 🔄 Flujo Completo de Datos - DE MODA CON VIVI

## 📊 **ESTRUCTURA DE TABLAS IMPLEMENTADA**

### **1. 👥 TABLA CLIENTES (14 registros)**
```sql
clientes (cedula, nombre, ciudad, telefono, direccion, observacion)
```
- **PK:** cedula (1-14)
- **Datos:** MAGITA HERNANDEZ, TEREZA DE JESUS, FANY RODRIGUEZ AYON, etc.

### **2. 🏷️ CATEGORÍAS DE ROPA (8 categorías)**
```sql
categoria_ropa (id, name)
```
- **PK:** id (1-8)
- **Categorías:** Blusas, Vestidos, Pantalones, Shorts, Chaquetas, Buzos, Interiores, Accesorios

### **3. 👗 PRODUCTOS DE ROPA (28 productos)**
```sql
ropa (id, nombre, precio, idCategoriaRopa)
```
- **PK:** id (1-28)
- **FK:** idCategoriaRopa → categoria_ropa.id
- **Productos:** Blusa Básica ($15), Vestido Casual ($35), Pantalón Jeans ($28), etc.

### **4. 🏷️ CATEGORÍAS DE CHUCHERÍAS (8 categorías)**
```sql
categoria_chucheria (id, name)
```
- **PK:** id (1-8)
- **Categorías:** Dulces, Chocolates, Galletas, Snacks, Bebidas, Helados, Gomas, Otros

### **5. 🍭 PRODUCTOS DE CHUCHERÍAS (32 productos)**
```sql
chucherias (id, nombre, precio, idCategoriaChucheria)
```
- **PK:** id (1-32)
- **FK:** idCategoriaChucheria → categoria_chucheria.id
- **Productos:** Caramelos ($0.50), Chocolate con Leche ($1.50), Galletas ($1.20), etc.

### **6. 💰 VENTAS DE ROPA (10 registros)**
```sql
ventas_ropa (id, fecha, idCliente, idRopa, cantidad)
```
- **PK:** id (1-10)
- **FK:** idCliente → clientes.cedula
- **FK:** idRopa → ropa.id

### **7. 💰 VENTAS DE CHUCHERÍAS (12 registros)**
```sql
ventas_chucheria (id, fecha, idCliente, idChucherias, cantidad)
```
- **PK:** id (1-12)
- **FK:** idCliente → clientes.cedula
- **FK:** idChucherias → chucherias.id

### **8. 🧾 FACTURAS DE ROPA (5 facturas)**
```sql
factura_ropa (funda, id, idVentasRopa, subtotal, total)
```
- **PK:** funda (1-5)
- **FK:** idVentasRopa → ventas_ropa.id[]

### **9. 🧾 FACTURAS DE CHUCHERÍAS (6 facturas)**
```sql
factura_chucheria (funda, id, idVentasChucheria, subtotal, total)
```
- **PK:** funda (1-6)
- **FK:** idVentasChucheria → ventas_chucheria.id[]

## 🔄 **FLUJO DE DATOS COMPLETO**

### **Paso 1: Cliente Selecciona Productos**
```
Cliente (cedula=1) → Selecciona → Productos Ropa (id=1, id=9)
```

### **Paso 2: Se Crean las Ventas**
```sql
INSERT INTO ventas_ropa (id, fecha, idCliente, idRopa, cantidad) VALUES
(1, '2025-01-21T10:30:00.000Z', 1, 1, 2),  -- Blusa Básica x2
(2, '2025-01-21T10:30:00.000Z', 1, 9, 1);  -- Pantalón Jeans x1
```

### **Paso 3: Se Genera la Factura**
```sql
INSERT INTO factura_ropa (funda, id, idVentasRopa, subtotal, total) VALUES
(1, 1, [1,2], 58.00, 58.00);  -- (15*2) + (28*1) = 58
```

## 📈 **EJEMPLOS DE VENTAS IMPLEMENTADAS**

### **👗 VENTA DE ROPA #1 - MAGITA HERNANDEZ**
- **Cliente:** MAGITA HERNANDEZ (cedula=1, QUEVEDO)
- **Productos:**
  - Blusa Básica (2 unidades) - $15.00 c/u = $30.00
  - Pantalón Jeans (1 unidad) - $28.00 c/u = $28.00
- **Total:** $58.00
- **Funda:** #1

### **👗 VENTA DE ROPA #2 - TEREZA DE JESUS**
- **Cliente:** TEREZA DE JESUS (cedula=2, TENGUEL)
- **Productos:**
  - Vestido Casual (1 unidad) - $35.00 c/u = $35.00
  - Chaqueta Casual (1 unidad) - $43.00 c/u = $43.00
- **Total:** $78.00
- **Funda:** #2

### **🍭 VENTA DE CHUCHERÍAS #1 - DIANA MABEL TOALA PONCE**
- **Cliente:** DIANA MABEL TOALA PONCE (cedula=6, JIPIJAPA)
- **Productos:**
  - Caramelos de Colores (5 unidades) - $0.50 c/u = $2.50
  - Chocolate con Leche (2 unidades) - $1.50 c/u = $3.00
- **Total:** $5.50
- **Funda:** #1

### **🍭 VENTA DE CHUCHERÍAS #2 - JENESY TECHITC**
- **Cliente:** JENESY TECHITC (cedula=7, JIPIJAPA)
- **Productos:**
  - Galletas de Vainilla (3 unidades) - $1.20 c/u = $3.60
  - Papas Fritas (2 unidades) - $1.50 c/u = $3.00
- **Total:** $6.60
- **Funda:** #2

## 🔗 **RELACIONES IMPLEMENTADAS**

### **Relaciones FK/PK:**
- ✅ `clientes.cedula` → `ventas_ropa.idCliente`
- ✅ `clientes.cedula` → `ventas_chucheria.idCliente`
- ✅ `categoria_ropa.id` → `ropa.idCategoriaRopa`
- ✅ `categoria_chucheria.id` → `chucherias.idCategoriaChucheria`
- ✅ `ropa.id` → `ventas_ropa.idRopa`
- ✅ `chucherias.id` → `ventas_chucheria.idChucherias`
- ✅ `ventas_ropa.id[]` → `factura_ropa.idVentasRopa`
- ✅ `ventas_chucheria.id[]` → `factura_chucheria.idVentasChucheria`

### **Separación Total:**
- ✅ **Ropa y Chucherías** completamente independientes
- ✅ **Fundas separadas** (Ropa: #1-5, Chucherías: #1-6)
- ✅ **Clientes diferentes** para cada tipo de venta
- ✅ **Productos específicos** para cada categoría

## 📊 **ESTADÍSTICAS GENERADAS**

### **Ventas de Ropa:**
- **Total de facturas:** 5
- **Total de artículos:** 10
- **Ingresos totales:** $328.00
- **Promedio por venta:** $65.60

### **Ventas de Chucherías:**
- **Total de facturas:** 6
- **Total de artículos:** 12
- **Ingresos totales:** $42.15
- **Promedio por venta:** $7.03

### **Clientes Activos:**
- **Ropa:** 5 clientes diferentes
- **Chucherías:** 6 clientes diferentes
- **Total único:** 11 clientes activos

## 🎯 **BENEFICIOS DEL FLUJO**

1. **Integridad Referencial** - Todas las FK/PK funcionan correctamente
2. **Separación Total** - Ropa y chucherías completamente independientes
3. **Datos Realistas** - Ventas con fechas, cantidades y precios coherentes
4. **Sistema de Fundas** - Numeración automática para cada tipo
5. **Cálculos Correctos** - Subtotales y totales calculados correctamente
6. **Relaciones Completas** - Desde clientes hasta facturas

## 🚀 **CÓMO VER EL FLUJO**

1. **Dashboard** (`index.html`) - Ver estadísticas generales
2. **Ventas Ropa** (`ventas-ropa.html`) - Ver ventas de ropa con productos
3. **Ventas Chucherías** (`ventas-chucherias.html`) - Ver ventas de chucherías
4. **Facturación** (`facturacion.html`) - Ver facturas generadas
5. **Test Database** (`test-database.html`) - Inspeccionar todas las tablas

---

*Flujo completo de datos implementado siguiendo el diagrama de base de datos proporcionado.*
