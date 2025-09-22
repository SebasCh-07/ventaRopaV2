/**
 * 🗄️ Gestor de Base de Datos - DE MODA CON VIVI
 * Implementa la estructura de base de datos según el diagrama proporcionado
 */

class DatabaseManager {
    constructor() {
        this.initializeDatabase();
    }

    /**
     * Inicializa la base de datos con la estructura del diagrama
     * Los datos se mantienen solo en memoria (se reinician al cerrar la pestaña)
     */
    initializeDatabase() {
        // Siempre crear la estructura inicial (sin persistencia)
        this.createInitialStructure();
        console.log('🗄️ Base de datos inicializada en memoria (se reinicia al cerrar la pestaña)');
    }

    /**
     * Crea la estructura inicial de la base de datos
     */
    createInitialStructure() {
        // Inicializar todas las tablas en memoria
        this.tables = {};
        
        // 1. Clientes (tabla central compartida)
        this.tables.clientes = [
            { cedula: 1, nombre: 'MAGITA HERNANDEZ', ciudad: 'QUEVEDO', telefono: '0987654321', direccion: 'Av. Principal 123', observacion: '' },
            { cedula: 2, nombre: 'TEREZA DE JESUS', ciudad: 'TENGUEL', telefono: '0987654321', direccion: 'Calle Principal 456', observacion: '' },
            { cedula: 3, nombre: 'FANY RODRIGUEZ AYON', ciudad: 'JIPIJAPA', telefono: '0976543210', direccion: 'Av. Libertad 789', observacion: '' },
            { cedula: 4, nombre: 'LALESKA SOLE', ciudad: 'GUAYAQUIL', telefono: '0987654321', direccion: 'Av. 9 de Octubre 321', observacion: '' },
            { cedula: 5, nombre: 'JORGE PATRICO', ciudad: 'JIPIJAPA', telefono: '0954321098', direccion: 'Calle 5 de Junio 654', observacion: '' },
            { cedula: 6, nombre: 'DIANA MABEL TOALA PONCE', ciudad: 'JIPIJAPA', telefono: '0987654321', direccion: 'Av. Manabí 987', observacion: '' },
            { cedula: 7, nombre: 'JENESY TECHITC', ciudad: 'JIPIJAPA', telefono: '0932109876', direccion: 'Calle Sucre 147', observacion: '' },
            { cedula: 8, nombre: 'ANGIE CHOEZ', ciudad: 'JIPIJAPA', telefono: '0987654321', direccion: 'Av. Bolívar 258', observacion: '' },
            { cedula: 9, nombre: 'ANY ANGULO', ciudad: 'GUAYAQUIL', telefono: '0910987654', direccion: 'Av. Kennedy 369', observacion: '' },
            { cedula: 10, nombre: 'VANEMARC', ciudad: 'MANTA', telefono: '0987654321', direccion: 'Calle 13 de Junio 741', observacion: '' },
            { cedula: 11, nombre: 'JIBSY VERA', ciudad: 'QUEVEDO', telefono: '0898765432', direccion: 'Av. 7 de Octubre 852', observacion: '' },
            { cedula: 12, nombre: 'MARICIELA VANESSA', ciudad: 'ROCAFUERTE', telefono: '0987654321', direccion: 'Calle 10 de Agosto 963', observacion: '' },
            { cedula: 13, nombre: 'VANESSA BANGUERA', ciudad: 'QUITO', telefono: '0876543210', direccion: 'Av. Amazonas 147', observacion: '' },
            { cedula: 14, nombre: 'EMILIA GE', ciudad: 'BAHIA DE CARAQUEZ', telefono: '0987654321', direccion: 'Calle Malecón 258', observacion: '' }
        ];

        // 2. Categorías de Ropa
        this.tables.categoria_ropa = [
            { id: 1, name: 'Blusas' },
            { id: 2, name: 'Vestidos' },
            { id: 3, name: 'Pantalones' },
            { id: 4, name: 'Shorts' },
            { id: 5, name: 'Chaquetas' },
            { id: 6, name: 'Buzos' },
            { id: 7, name: 'Interiores' },
            { id: 8, name: 'Accesorios' }
        ];

        // 3. Productos de Ropa
        this.tables.ropa = [
            // Blusas
            { id: 1, nombre: 'Blusa Básica', precio: 15.00, idCategoriaRopa: 1 },
            { id: 2, nombre: 'Blusa Elegante', precio: 25.00, idCategoriaRopa: 1 },
            { id: 3, nombre: 'Blusa Casual', precio: 18.00, idCategoriaRopa: 1 },
            { id: 4, nombre: 'Blusa de Trabajo', precio: 22.00, idCategoriaRopa: 1 },
            
            // Vestidos
            { id: 5, nombre: 'Vestido Casual', precio: 35.00, idCategoriaRopa: 2 },
            { id: 6, nombre: 'Vestido Elegante', precio: 45.00, idCategoriaRopa: 2 },
            { id: 7, nombre: 'Vestido de Fiesta', precio: 55.00, idCategoriaRopa: 2 },
            { id: 8, nombre: 'Vestido de Verano', precio: 30.00, idCategoriaRopa: 2 },
            
            // Pantalones
            { id: 9, nombre: 'Pantalón Jeans', precio: 28.00, idCategoriaRopa: 3 },
            { id: 10, nombre: 'Pantalón Formal', precio: 35.00, idCategoriaRopa: 3 },
            { id: 11, nombre: 'Pantalón Casual', precio: 25.00, idCategoriaRopa: 3 },
            { id: 12, nombre: 'Pantalón de Trabajo', precio: 32.00, idCategoriaRopa: 3 },
            
            // Shorts
            { id: 13, nombre: 'Short Deportivo', precio: 18.00, idCategoriaRopa: 4 },
            { id: 14, nombre: 'Short Casual', precio: 20.00, idCategoriaRopa: 4 },
            { id: 15, nombre: 'Short Elegante', precio: 25.00, idCategoriaRopa: 4 },
            
            // Chaquetas
            { id: 16, nombre: 'Chaqueta Casual', precio: 43.00, idCategoriaRopa: 5 },
            { id: 17, nombre: 'Chaqueta Elegante', precio: 36.00, idCategoriaRopa: 5 },
            { id: 18, nombre: 'Chaqueta de Cuero', precio: 65.00, idCategoriaRopa: 5 },
            { id: 19, nombre: 'Chaqueta de Invierno', precio: 45.00, idCategoriaRopa: 5 },
            
            // Buzos
            { id: 20, nombre: 'Buzo con Capucha', precio: 30.00, idCategoriaRopa: 6 },
            { id: 21, nombre: 'Buzo Básico', precio: 25.00, idCategoriaRopa: 6 },
            { id: 22, nombre: 'Buzo Deportivo', precio: 28.00, idCategoriaRopa: 6 },
            
            // Interiores
            { id: 23, nombre: 'Conjunto Interior', precio: 12.00, idCategoriaRopa: 7 },
            { id: 24, nombre: 'Interior Básico', precio: 8.00, idCategoriaRopa: 7 },
            { id: 25, nombre: 'Interior Elegante', precio: 15.00, idCategoriaRopa: 7 },
            
            // Accesorios
            { id: 26, nombre: 'Bolso Pequeño', precio: 15.00, idCategoriaRopa: 8 },
            { id: 27, nombre: 'Cinturón', precio: 10.00, idCategoriaRopa: 8 },
            { id: 28, nombre: 'Bufanda', precio: 12.00, idCategoriaRopa: 8 }
        ];

        // 4. Categorías de Chucherías
        this.tables.categoria_chucheria = [
            { id: 1, name: 'Dulces' },
            { id: 2, name: 'Chocolates' },
            { id: 3, name: 'Galletas' },
            { id: 4, name: 'Snacks' },
            { id: 5, name: 'Bebidas' },
            { id: 6, name: 'Helados' },
            { id: 7, name: 'Gomas' },
            { id: 8, name: 'Otros' }
        ];

        // 5. Productos de Chucherías
        this.tables.chucherias = [
            // Dulces
            { id: 1, nombre: 'Caramelos de Colores', precio: 0.50, idCategoriaChucheria: 1 },
            { id: 2, nombre: 'Paletas de Fresa', precio: 0.75, idCategoriaChucheria: 1 },
            { id: 3, nombre: 'Gomitas de Ositos', precio: 1.00, idCategoriaChucheria: 1 },
            { id: 4, nombre: 'Bombones de Chocolate', precio: 1.25, idCategoriaChucheria: 1 },
            
            // Chocolates
            { id: 5, nombre: 'Chocolate con Leche', precio: 1.50, idCategoriaChucheria: 2 },
            { id: 6, nombre: 'Chocolate Negro', precio: 1.75, idCategoriaChucheria: 2 },
            { id: 7, nombre: 'Chocolate Blanco', precio: 1.60, idCategoriaChucheria: 2 },
            { id: 8, nombre: 'Chocolate con Almendras', precio: 2.00, idCategoriaChucheria: 2 },
            
            // Galletas
            { id: 9, nombre: 'Galletas de Vainilla', precio: 1.20, idCategoriaChucheria: 3 },
            { id: 10, nombre: 'Galletas de Chocolate', precio: 1.30, idCategoriaChucheria: 3 },
            { id: 11, nombre: 'Galletas de Avena', precio: 1.40, idCategoriaChucheria: 3 },
            { id: 12, nombre: 'Galletas de Mantequilla', precio: 1.35, idCategoriaChucheria: 3 },
            
            // Snacks
            { id: 13, nombre: 'Papas Fritas', precio: 1.50, idCategoriaChucheria: 4 },
            { id: 14, nombre: 'Doritos', precio: 1.60, idCategoriaChucheria: 4 },
            { id: 15, nombre: 'Cheetos', precio: 1.55, idCategoriaChucheria: 4 },
            { id: 16, nombre: 'Pretzels', precio: 1.45, idCategoriaChucheria: 4 },
            
            // Bebidas
            { id: 17, nombre: 'Refresco Cola', precio: 1.80, idCategoriaChucheria: 5 },
            { id: 18, nombre: 'Jugo de Naranja', precio: 1.50, idCategoriaChucheria: 5 },
            { id: 19, nombre: 'Agua', precio: 0.80, idCategoriaChucheria: 5 },
            { id: 20, nombre: 'Té Helado', precio: 1.20, idCategoriaChucheria: 5 },
            
            // Helados
            { id: 21, nombre: 'Helado de Vainilla', precio: 2.00, idCategoriaChucheria: 6 },
            { id: 22, nombre: 'Helado de Chocolate', precio: 2.10, idCategoriaChucheria: 6 },
            { id: 23, nombre: 'Helado de Fresa', precio: 2.05, idCategoriaChucheria: 6 },
            { id: 24, nombre: 'Helado de Limón', precio: 2.00, idCategoriaChucheria: 6 },
            
            // Gomas
            { id: 25, nombre: 'Gomas de Frutas', precio: 0.80, idCategoriaChucheria: 7 },
            { id: 26, nombre: 'Gomas de Ositos', precio: 0.90, idCategoriaChucheria: 7 },
            { id: 27, nombre: 'Gomas de Gusano', precio: 0.85, idCategoriaChucheria: 7 },
            { id: 28, nombre: 'Gomas de Corazón', precio: 0.95, idCategoriaChucheria: 7 },
            
            // Otros
            { id: 29, nombre: 'Palomitas', precio: 1.00, idCategoriaChucheria: 8 },
            { id: 30, nombre: 'Algodón de Azúcar', precio: 1.50, idCategoriaChucheria: 8 },
            { id: 31, nombre: 'Mazapán', precio: 1.25, idCategoriaChucheria: 8 },
            { id: 32, nombre: 'Turrón', precio: 1.75, idCategoriaChucheria: 8 }
        ];

        // 6. Ventas de ejemplo con datos relacionados
        this.tables.ventas_ropa = [
            // Venta 1 - MAGITA HERNANDEZ
            {
                id: 1,
                fecha: '2025-01-21T10:30:00.000Z',
                idCliente: 1,
                idRopa: 1, // Blusa Básica
                cantidad: 2
            },
            {
                id: 2,
                fecha: '2025-01-21T10:30:00.000Z',
                idCliente: 1,
                idRopa: 9, // Pantalón Jeans
                cantidad: 1
            },
            // Venta 2 - TEREZA DE JESUS
            {
                id: 3,
                fecha: '2025-01-21T14:15:00.000Z',
                idCliente: 2,
                idRopa: 5, // Vestido Casual
                cantidad: 1
            },
            {
                id: 4,
                fecha: '2025-01-21T14:15:00.000Z',
                idCliente: 2,
                idRopa: 16, // Chaqueta Casual
                cantidad: 1
            },
            // Venta 3 - FANY RODRIGUEZ AYON
            {
                id: 5,
                fecha: '2025-01-21T16:45:00.000Z',
                idCliente: 3,
                idRopa: 2, // Blusa Elegante
                cantidad: 1
            },
            {
                id: 6,
                fecha: '2025-01-21T16:45:00.000Z',
                idCliente: 3,
                idRopa: 13, // Short Deportivo
                cantidad: 2
            },
            // Venta 4 - LALESKA SOLE
            {
                id: 7,
                fecha: '2025-01-22T09:20:00.000Z',
                idCliente: 4,
                idRopa: 6, // Vestido Elegante
                cantidad: 1
            },
            {
                id: 8,
                fecha: '2025-01-22T09:20:00.000Z',
                idCliente: 4,
                idRopa: 26, // Bolso Pequeño
                cantidad: 1
            },
            // Venta 5 - JORGE PATRICO
            {
                id: 9,
                fecha: '2025-01-22T11:30:00.000Z',
                idCliente: 5,
                idRopa: 10, // Pantalón Formal
                cantidad: 1
            },
            {
                id: 10,
                fecha: '2025-01-22T11:30:00.000Z',
                idCliente: 5,
                idRopa: 17, // Chaqueta Elegante
                cantidad: 1
            }
        ];

        this.tables.ventas_chucheria = [
            // Venta 1 - DIANA MABEL TOALA PONCE
            {
                id: 1,
                fecha: '2025-01-21T08:15:00.000Z',
                idCliente: 6,
                idChucherias: 1, // Caramelos de Colores
                cantidad: 5
            },
            {
                id: 2,
                fecha: '2025-01-21T08:15:00.000Z',
                idCliente: 6,
                idChucherias: 5, // Chocolate con Leche
                cantidad: 2
            },
            // Venta 2 - JENESY TECHITC
            {
                id: 3,
                fecha: '2025-01-21T12:30:00.000Z',
                idCliente: 7,
                idChucherias: 9, // Galletas de Vainilla
                cantidad: 3
            },
            {
                id: 4,
                fecha: '2025-01-21T12:30:00.000Z',
                idCliente: 7,
                idChucherias: 13, // Papas Fritas
                cantidad: 2
            },
            // Venta 3 - ANGIE CHOEZ
            {
                id: 5,
                fecha: '2025-01-21T15:45:00.000Z',
                idCliente: 8,
                idChucherias: 2, // Paletas de Fresa
                cantidad: 4
            },
            {
                id: 6,
                fecha: '2025-01-21T15:45:00.000Z',
                idCliente: 8,
                idChucherias: 17, // Refresco de Cola
                cantidad: 2
            },
            // Venta 4 - ANY ANGULO
            {
                id: 7,
                fecha: '2025-01-22T10:00:00.000Z',
                idCliente: 9,
                idChucherias: 3, // Gomitas de Ositos
                cantidad: 6
            },
            {
                id: 8,
                fecha: '2025-01-22T10:00:00.000Z',
                idCliente: 9,
                idChucherias: 21, // Helado de Vainilla
                cantidad: 1
            },
            // Venta 5 - VANEMARC
            {
                id: 9,
                fecha: '2025-01-22T13:20:00.000Z',
                idCliente: 10,
                idChucherias: 6, // Chocolate Negro
                cantidad: 3
            },
            {
                id: 10,
                fecha: '2025-01-22T13:20:00.000Z',
                idCliente: 10,
                idChucherias: 14, // Doritos
                cantidad: 2
            },
            // Venta 6 - JIBSY VERA
            {
                id: 11,
                fecha: '2025-01-22T16:10:00.000Z',
                idCliente: 11,
                idChucherias: 4, // Bombones de Chocolate
                cantidad: 4
            },
            {
                id: 12,
                fecha: '2025-01-22T16:10:00.000Z',
                idCliente: 11,
                idChucherias: 18, // Jugo de Naranja
                cantidad: 3
            }
        ];

        // 7. Facturas de ejemplo
        this.tables.factura_ropa = [
            {
                funda: 1,
                id: 1,
                idVentasRopa: [1, 2], // Venta de MAGITA HERNANDEZ
                subtotal: 58.00, // (15*2) + (28*1) = 30 + 28 = 58
                total: 58.00
            },
            {
                funda: 2,
                id: 2,
                idVentasRopa: [3, 4], // Venta de TEREZA DE JESUS
                subtotal: 78.00, // (35*1) + (43*1) = 35 + 43 = 78
                total: 78.00
            },
            {
                funda: 3,
                id: 3,
                idVentasRopa: [5, 6], // Venta de FANY RODRIGUEZ AYON
                subtotal: 61.00, // (25*1) + (18*2) = 25 + 36 = 61
                total: 61.00
            },
            {
                funda: 4,
                id: 4,
                idVentasRopa: [7, 8], // Venta de LALESKA SOLE
                subtotal: 60.00, // (45*1) + (15*1) = 45 + 15 = 60
                total: 60.00
            },
            {
                funda: 5,
                id: 5,
                idVentasRopa: [9, 10], // Venta de JORGE PATRICO
                subtotal: 71.00, // (35*1) + (36*1) = 35 + 36 = 71
                total: 71.00
            }
        ];

        this.tables.factura_chucheria = [
            {
                funda: 1,
                id: 1,
                idVentasChucheria: [1, 2], // Venta de DIANA MABEL TOALA PONCE
                subtotal: 4.50,
                total: 4.50
            },
            {
                funda: 2,
                id: 2,
                idVentasChucheria: [3, 4], // Venta de JENESY TECHITC
                subtotal: 4.20,
                total: 4.20
            },
            {
                funda: 3,
                id: 3,
                idVentasChucheria: [5, 6], // Venta de ANGIE CHOEZ
                subtotal: 4.50,
                total: 4.50
            },
            {
                funda: 4,
                id: 4,
                idVentasChucheria: [7, 8], // Venta de ANY ANGULO
                subtotal: 4.25,
                total: 4.25
            },
            {
                funda: 5,
                id: 5,
                idVentasChucheria: [9, 10], // Venta de VANEMARC
                subtotal: 5.25,
                total: 5.25
            },
            {
                funda: 6,
                id: 6,
                idVentasChucheria: [11, 12], // Venta de JIBSY VERA
                subtotal: 4.75,
                total: 4.75
            }
        ];

        // 8. Contadores de fundas actualizados
        this.tables.contadores = {
            funda_ropa: 6, // Próxima funda de ropa
            funda_chucheria: 7 // Próxima funda de chucherías
        };
    }

    /**
     * Guarda una tabla en memoria (sin persistencia)
     */
    saveTable(tableName, data) {
        this.tables[tableName] = data;
    }

    /**
     * Obtiene una tabla desde memoria
     */
    getTable(tableName) {
        return this.tables[tableName] || [];
    }

    /**
     * Obtiene un cliente por cédula
     */
    getClientByCedula(cedula) {
        const clientes = this.getTable('clientes');
        return clientes.find(cliente => cliente.cedula === cedula);
    }

    /**
     * Obtiene todos los clientes
     */
    getAllClients() {
        return this.getTable('clientes');
    }

    /**
     * Agrega un nuevo cliente
     */
    addClient(clientData) {
        const clientes = this.getTable('clientes');
        const newCedula = Math.max(...clientes.map(c => c.cedula), 0) + 1;
        const newClient = {
            cedula: newCedula,
            nombre: clientData.nombre,
            ciudad: clientData.ciudad,
            telefono: clientData.telefono || '',
            direccion: clientData.direccion || '',
            observacion: clientData.observacion || ''
        };
        clientes.push(newClient);
        this.tables.clientes = clientes; // Actualizar directamente en memoria
        return newClient;
    }

    /**
     * Actualiza un cliente
     */
    updateClient(cedula, clientData) {
        const clientes = this.getTable('clientes');
        const index = clientes.findIndex(c => c.cedula === cedula);
        if (index !== -1) {
            clientes[index] = { ...clientes[index], ...clientData };
            this.tables.clientes = clientes; // Actualizar directamente en memoria
            return clientes[index];
        }
        return null;
    }

    /**
     * Elimina un cliente
     */
    deleteClient(cedula) {
        const clientes = this.getTable('clientes');
        const filteredClients = clientes.filter(c => c.cedula !== cedula);
        this.tables.clientes = filteredClients; // Actualizar directamente en memoria
    }

    /**
     * Obtiene productos de ropa por categoría
     */
    getRopaByCategory(categoriaId) {
        const ropa = this.getTable('ropa');
        return ropa.filter(item => item.idCategoriaRopa === categoriaId);
    }

    /**
     * Obtiene productos de chucherías por categoría
     */
    getChucheriasByCategory(categoriaId) {
        const chucherias = this.getTable('chucherias');
        return chucherias.filter(item => item.idCategoriaChucheria === categoriaId);
    }

    /**
     * Obtiene todas las categorías de ropa
     */
    getCategoriasRopa() {
        return this.getTable('categoria_ropa');
    }

    /**
     * Obtiene todas las categorías de chucherías
     */
    getCategoriasChucherias() {
        return this.getTable('categoria_chucheria');
    }

    /**
     * Obtiene un producto de ropa por ID
     */
    getRopaById(id) {
        const ropa = this.getTable('ropa');
        return ropa.find(item => item.id === id);
    }

    /**
     * Obtiene un producto de chucherías por ID
     */
    getChucheriaById(id) {
        const chucherias = this.getTable('chucherias');
        return chucherias.find(item => item.id === id);
    }

    /**
     * Crea una nueva venta de ropa
     */
    createVentaRopa(ventaData) {
        const ventas = this.getTable('ventas_ropa');
        const contadores = this.getTable('contadores');
        
        const newVenta = {
            id: ventas.length + 1,
            fecha: ventaData.fecha,
            idCliente: ventaData.idCliente,
            idRopa: ventaData.idRopa,
            cantidad: ventaData.cantidad
        };
        
        ventas.push(newVenta);
        this.tables.ventas_ropa = ventas; // Actualizar directamente en memoria
        
        return newVenta;
    }

    /**
     * Crea una nueva venta de chucherías
     */
    createVentaChucheria(ventaData) {
        const ventas = this.getTable('ventas_chucheria');
        const contadores = this.getTable('contadores');
        
        const newVenta = {
            id: ventas.length + 1,
            fecha: ventaData.fecha,
            idCliente: ventaData.idCliente,
            idChucherias: ventaData.idChucherias,
            cantidad: ventaData.cantidad
        };
        
        ventas.push(newVenta);
        this.tables.ventas_chucheria = ventas; // Actualizar directamente en memoria
        
        return newVenta;
    }

    /**
     * Crea una factura de ropa
     */
    createFacturaRopa(facturaData) {
        const facturas = this.getTable('factura_ropa');
        const contadores = this.getTable('contadores');
        
        const newFactura = {
            funda: contadores.funda_ropa,
            id: facturas.length + 1,
            idVentasRopa: facturaData.idVentasRopa,
            subtotal: facturaData.subtotal,
            total: facturaData.total
        };
        
        facturas.push(newFactura);
        this.tables.factura_ropa = facturas; // Actualizar directamente en memoria
        
        // Incrementar contador de fundas
        contadores.funda_ropa++;
        this.tables.contadores = contadores; // Actualizar directamente en memoria
        
        return newFactura;
    }

    /**
     * Crea una factura de chucherías
     */
    createFacturaChucheria(facturaData) {
        const facturas = this.getTable('factura_chucheria');
        const contadores = this.getTable('contadores');
        
        const newFactura = {
            funda: contadores.funda_chucheria,
            id: facturas.length + 1,
            idVentasChucheria: facturaData.idVentasChucheria,
            subtotal: facturaData.subtotal,
            total: facturaData.total
        };
        
        facturas.push(newFactura);
        this.tables.factura_chucheria = facturas; // Actualizar directamente en memoria
        
        // Incrementar contador de fundas
        contadores.funda_chucheria++;
        this.tables.contadores = contadores; // Actualizar directamente en memoria
        
        return newFactura;
    }

    /**
     * Obtiene todas las ventas de ropa con información completa
     */
    getVentasRopaCompletas() {
        const ventas = this.getTable('ventas_ropa');
        const facturas = this.getTable('factura_ropa');
        const clientes = this.getTable('clientes');
        const ropa = this.getTable('ropa');
        
        return ventas.map(venta => {
            const factura = facturas.find(f => Array.isArray(f.idVentasRopa) ? f.idVentasRopa.includes(venta.id) : f.idVentasRopa === venta.id);
            const cliente = clientes.find(c => c.cedula === venta.idCliente);
            const producto = ropa.find(r => r.id === venta.idRopa);
            
            return {
                ...venta,
                cliente: cliente,
                producto: producto,
                factura: factura
            };
        });
    }

    /**
     * Obtiene todas las ventas de chucherías con información completa
     */
    getVentasChucheriaCompletas() {
        const ventas = this.getTable('ventas_chucheria');
        const facturas = this.getTable('factura_chucheria');
        const clientes = this.getTable('clientes');
        const chucherias = this.getTable('chucherias');
        
        return ventas.map(venta => {
            const factura = facturas.find(f => Array.isArray(f.idVentasChucheria) ? f.idVentasChucheria.includes(venta.id) : f.idVentasChucheria === venta.id);
            const cliente = clientes.find(c => c.cedula === venta.idCliente);
            const producto = chucherias.find(ch => ch.id === venta.idChucherias);
            
            return {
                ...venta,
                cliente: cliente,
                producto: producto,
                factura: factura
            };
        });
    }

    /**
     * Obtiene el siguiente número de funda para ropa
     */
    getNextFundaRopa() {
        const contadores = this.getTable('contadores');
        return contadores.funda_ropa;
    }

    /**
     * Obtiene el siguiente número de funda para chucherías
     */
    getNextFundaChucheria() {
        const contadores = this.getTable('contadores');
        return contadores.funda_chucheria;
    }

    /**
     * Busca clientes por criterio
     */
    searchClients(query) {
        const clientes = this.getTable('clientes');
        const lowerQuery = query.toLowerCase();
        
        return clientes.filter(cliente => 
            cliente.nombre.toLowerCase().includes(lowerQuery) ||
            cliente.ciudad.toLowerCase().includes(lowerQuery) ||
            cliente.telefono.includes(query) ||
            cliente.direccion.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Obtiene estadísticas generales
     */
    getStats() {
        const ventasRopa = this.getTable('ventas_ropa');
        const ventasChucheria = this.getTable('ventas_chucheria');
        const facturasRopa = this.getTable('factura_ropa');
        const facturasChucheria = this.getTable('factura_chucheria');
        const clientes = this.getTable('clientes');
        
        const totalVentas = ventasRopa.length + ventasChucheria.length;
        const totalFacturas = facturasRopa.length + facturasChucheria.length;
        const totalClientes = clientes.length;
        
        const ingresosRopa = facturasRopa.reduce((sum, f) => sum + f.total, 0);
        const ingresosChucheria = facturasChucheria.reduce((sum, f) => sum + f.total, 0);
        const totalIngresos = ingresosRopa + ingresosChucheria;
        
        return {
            totalVentas,
            totalFacturas,
            totalClientes,
            totalIngresos,
            ingresosRopa,
            ingresosChucheria
        };
    }
}

// Inicializar la base de datos globalmente
window.database = new DatabaseManager();
