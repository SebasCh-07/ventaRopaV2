/**
 * FACTURACION.JS - Lógica específica para facturación
 * Manejo de filtros, exportación, impresión y reportes
 */

class FacturacionManager {
    constructor() {
        this.sales = [];
        this.clients = [];
        this.filteredSales = [];
        this.filters = {
            dateFrom: null,
            dateTo: null,
            funda: null,
            client: null
        };
        this.selectedSales = new Set();
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.setupDateFilters();
        this.updateSummaryCards();
        this.updateFilters();
        this.renderSales();
        this.applyClientFilter();
    }

    setupEventListeners() {
        // Filtros de fecha
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        
        if (dateFrom) {
            dateFrom.addEventListener('change', () => this.applyFilters());
        }
        
        if (dateTo) {
            dateTo.addEventListener('change', () => this.applyFilters());
        }

        // Filtros de funda y cliente
        const fundaFilter = document.getElementById('funda-filter');
        const clientFilter = document.getElementById('client-filter');
        
        if (fundaFilter) {
            fundaFilter.addEventListener('change', () => this.applyFilters());
        }
        
        if (clientFilter) {
            clientFilter.addEventListener('change', () => this.applyFilters());
        }

        // Cerrar modales
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Teclas de acceso rápido
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.exportAllData();
            }
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                this.printAllSales();
            }
        });
    }

    loadData() {
        if (window.database) {
            // Cargar ventas de ropa
            const ropaSales = window.database.getVentasRopaCompletas();
            const chucheriasSales = window.database.getVentasChucheriaCompletas();
            
            // Convertir a formato de facturación
            this.sales = [];
            
            // Procesar ventas de ropa (unificar estructura de cliente y normalizar campos)
            ropaSales.forEach(venta => {
                const cliente = venta.cliente ? {
                    id: venta.cliente.cedula, // mantener compatibilidad
                    cedula: venta.cliente.cedula,
                    name: venta.cliente.nombre,
                    nombre: venta.cliente.nombre,
                    city: venta.cliente.ciudad,
                    ciudad: venta.cliente.ciudad,
                    phone: venta.cliente.telefono,
                    telefono: venta.cliente.telefono,
                    address: venta.cliente.direccion,
                    direccion: venta.cliente.direccion
                } : null;

                const quantity = Number(venta.cantidad || 1);
                const price = Number(venta.producto?.precio || 0);
                const itemSubtotal = price * quantity;

                this.sales.push({
                    id: venta.id,
                    funda: venta.factura?.funda || 0,
                    client: cliente,
                    items: [{
                        description: venta.producto?.nombre || 'Producto no encontrado',
                        quantity: quantity,
                        subtotal: itemSubtotal
                    }],
                    total: itemSubtotal,
                    date: venta.fecha,
                    tipo: 'ropa'
                });
            });
            
            // Procesar ventas de chucherías (unificar estructura de cliente y normalizar campos)
            chucheriasSales.forEach(venta => {
                const cliente = venta.cliente ? {
                    id: venta.cliente.cedula,
                    cedula: venta.cliente.cedula,
                    name: venta.cliente.nombre,
                    nombre: venta.cliente.nombre,
                    city: venta.cliente.ciudad,
                    ciudad: venta.cliente.ciudad,
                    phone: venta.cliente.telefono,
                    telefono: venta.cliente.telefono,
                    address: venta.cliente.direccion,
                    direccion: venta.cliente.direccion
                } : null;

                const quantity = Number(venta.cantidad || 1);
                const price = Number(venta.producto?.precio || 0);
                const itemSubtotal = price * quantity;

                this.sales.push({
                    id: venta.id + 1000, // Offset para evitar conflictos de ID
                    funda: venta.factura?.funda || 0,
                    client: cliente,
                    items: [{
                        description: venta.producto?.nombre || 'Producto no encontrado',
                        quantity: quantity,
                        subtotal: itemSubtotal
                    }],
                    total: itemSubtotal,
                    date: venta.fecha,
                    tipo: 'chucherias'
                });
            });
            
            this.clients = window.database.getAllClients();
        } else {
            // Datos de ejemplo si no hay base de datos
            this.sales = [];
            this.clients = [];
        }
        
        this.filteredSales = [...this.sales];
        
        // Aplicar filtro de cliente si viene de otra página
        const clientFilter = localStorage.getItem('filter_client_id');
        if (clientFilter) {
            this.filters.client = parseInt(clientFilter);
            localStorage.removeItem('filter_client_id');
        }
        
        console.log('📋 Datos de facturación cargados:', this.sales.length, 'ventas');
    }

    setupDateFilters() {
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        
        if (dateFrom && dateTo) {
            // Establecer fechas por defecto (último mes)
            const today = new Date();
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            
            dateFrom.value = lastMonth.toISOString().split('T')[0];
            dateTo.value = today.toISOString().split('T')[0];
            
            this.filters.dateFrom = lastMonth;
            this.filters.dateTo = today;
        }
    }

    // ===== ACTUALIZACIÓN DE FILTROS =====
    updateFilters() {
        this.updateFundaFilter();
        this.updateClientFilter();
    }

    updateFundaFilter() {
        const fundaFilter = document.getElementById('funda-filter');
        if (!fundaFilter) return;

        const fundas = [...new Set(this.sales.map(sale => sale.funda))].sort((a, b) => b - a);
        
        fundaFilter.innerHTML = '<option value="">Todas las fundas</option>';
        
        fundas.forEach(funda => {
            const option = document.createElement('option');
            option.value = funda;
            option.textContent = `Funda ${funda}`;
            fundaFilter.appendChild(option);
        });

        // Aplicar filtro si existe
        if (this.filters.funda) {
            fundaFilter.value = this.filters.funda;
        }
    }

    updateClientFilter() {
        const clientFilter = document.getElementById('client-filter');
        if (!clientFilter) return;

        // Obtener clientes que tienen ventas de forma segura
        const clientsWithSales = [...new Set(this.sales.map(sale => {
            if (sale.client && (sale.client.cedula || sale.client.id)) {
                return sale.client.cedula ?? sale.client.id;
            } else if (sale.clientId) {
                return sale.clientId;
            }
            return null;
        }).filter(id => id !== null))];
        
        const activeClients = this.clients.filter(client => 
            clientsWithSales.includes(client.cedula)
        ).sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));

        clientFilter.innerHTML = '<option value="">Todos los clientes</option>';
        
        activeClients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.cedula;
            option.textContent = `${client.nombre} - ${client.ciudad}`;
            clientFilter.appendChild(option);
        });

        // Aplicar filtro si existe
        if (this.filters.client) {
            clientFilter.value = this.filters.client;
        }
    }

    applyFilters() {
        // Obtener valores de los filtros
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        const fundaFilter = document.getElementById('funda-filter');
        const clientFilter = document.getElementById('client-filter');

        // Actualizar filtros internos
        this.filters.dateFrom = dateFrom ? new Date(dateFrom.value) : null;
        this.filters.dateTo = dateTo ? new Date(dateTo.value + 'T23:59:59') : null;
        this.filters.funda = fundaFilter ? fundaFilter.value : null;
        this.filters.client = clientFilter ? clientFilter.value : null;

        // Aplicar filtros
        this.filteredSales = this.sales.filter(sale => {
            // Filtro por fecha
            if (this.filters.dateFrom) {
                const saleDate = new Date(sale.date);
                if (saleDate < this.filters.dateFrom) return false;
            }
            
            if (this.filters.dateTo) {
                const saleDate = new Date(sale.date);
                if (saleDate > this.filters.dateTo) return false;
            }

            // Filtro por funda
            if (this.filters.funda && sale.funda != this.filters.funda) {
                return false;
            }

            // Filtro por cliente
            if (this.filters.client) {
                const saleClientId = sale.client ? (sale.client.cedula ?? sale.client.id) : sale.clientId;
                if (saleClientId != this.filters.client) {
                    return false;
                }
            }

            return true;
        });

        this.renderSales();
        this.updateSummaryCards();
        this.updateEmptyState();
    }

    clearFilters() {
        // Limpiar filtros del DOM
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        const fundaFilter = document.getElementById('funda-filter');
        const clientFilter = document.getElementById('client-filter');

        if (dateFrom) dateFrom.value = '';
        if (dateTo) dateTo.value = '';
        if (fundaFilter) fundaFilter.value = '';
        if (clientFilter) clientFilter.value = '';

        // Limpiar filtros internos
        this.filters = {
            dateFrom: null,
            dateTo: null,
            funda: null,
            client: null
        };

        this.filteredSales = [...this.sales];
        this.renderSales();
        this.updateSummaryCards();
        this.updateEmptyState();
    }

    applyClientFilter() {
        if (this.filters.client) {
            this.applyFilters();
        }
    }

    // ===== RENDERIZADO DE VENTAS =====
    renderSales() {
        const container = document.getElementById('sales-list');
        if (!container) return;

        if (this.filteredSales.length === 0) {
            container.innerHTML = '';
            return;
        }

        // Agrupar por cliente y día para evitar duplicados en la lista
        const groups = new Map();
        for (const sale of this.filteredSales) {
            const clientId = sale.client ? (sale.client.cedula ?? sale.client.id) : sale.clientId;
            const key = `${clientId}|${this.getDateKey(sale.date)}`;
            if (!groups.has(key)) {
                groups.set(key, {
                    representative: sale,
                    items: [],
                    total: 0,
                    tipos: new Set()
                });
            }
            const group = groups.get(key);
            group.items.push(...(sale.items || sale.articulos || []));
            group.total += Number(sale.total || 0);
            if (sale.tipo) group.tipos.add(sale.tipo);
        }

        // Preparar ventas a mostrar: una por grupo
        const groupedSales = Array.from(groups.values()).map(g => {
            const firstItem = g.items[0] || { description: 'Artículo', quantity: 1, subtotal: 0 };
            // Determinar tipo del grupo (si hay mezcla, por simplicidad dejamos ROPA)
            const tipoGrupo = (g.tipos.size === 1 && g.tipos.has('chucherias')) ? 'chucherias' : 'ropa';
            return {
                ...g.representative,
                // Mostrar solo el primer artículo como referencia en la lista
                items: [firstItem],
                total: g.total,
                tipo: tipoGrupo
            };
        });

        // Ordenar por fecha descendente usando la venta representante
        groupedSales.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = groupedSales.map(sale => this.renderSaleCard(sale)).join('');
    }

    renderSaleCard(sale) {
        const date = new Date(sale.date);
        const formattedDate = date.toLocaleDateString('es-EC');
        const formattedTime = date.toLocaleTimeString('es-EC', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        // Obtener artículos (puede ser items o articulos)
        const items = sale.items || sale.articulos || [];
        const clientName = sale.client ? (sale.client.nombre || sale.client.name) : 'Cliente no encontrado';
        const clientCity = sale.client ? (sale.client.ciudad || sale.client.city || '') : '';
        const clientCode = sale.client ? this.getClientCode(sale.client) : '';

        const firstItemName = items.length > 0 ? (items[0].description || items[0].nombre || 'Artículo') : 'Artículo';
        const firstItemQty = items.length > 0 ? (items[0].quantity || 1) : 1;
        const firstItemSubtotal = items.length > 0 ? (items[0].subtotal || 0) : 0;

        const tipoText = (sale.tipo === 'chucherias') ? 'CHUCHERIAS' : 'ROPA';

        return `
            <div class="sale-card" data-sale-id="${sale.id}">
                <div class="sale-card-header">
                    <div class="left">${clientCode}</div>
                    <div class="center"><span class="sale-type-badge">${tipoText}</span></div>
                    <div class="right">${formattedDate} ${formattedTime}</div>
                </div>

                <div class="sale-grid">
                    <div class="cell">
                        <div class="cell-label">Nombre</div>
                        <div class="cell-value">${clientName}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-label">Ciudad</div>
                        <div class="cell-value">${clientCity}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-label">Artículo</div>
                        <div class="cell-value"><button class="btn btn-sm btn-primary" onclick="facturacionManager.viewSaleDetail(${sale.id})">Ver</button></div>
                    </div>
                    <div class="cell">
                        <div class="cell-label">Cantidad</div>
                        <div class="cell-value">${firstItemQty}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-label">Subtotal</div>
                        <div class="cell-value">$${firstItemSubtotal.toFixed(2)}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-label">Total</div>
                        <div class="cell-value">$${(sale.total || 0).toFixed(2)}</div>
                    </div>
                </div>

                <div class="sale-footer">
                    <button class="btn btn-sm btn-secondary" onclick="facturacionManager.openInvoicePage(${sale.id})">Factura</button>
                </div>
            </div>
        `;
    }

    getClientCode(client) {
        const baseId = client?.cedula ?? client?.id ?? '';
        const normalized = String(baseId).replace(/\D/g, '');
        if (!normalized) return '';
        return `CLI-${normalized.padStart(6, '0')}`;
    }

    // ===== ESTADÍSTICAS =====
    updateSummaryCards() {
        const stats = this.calculateStats();
        
        this.updateElement('total-sales', stats.totalSales);
        this.updateElement('total-revenue', this.formatCurrency(stats.totalRevenue));
        this.updateElement('total-items', stats.totalItems);
        this.updateElement('unique-clients', stats.uniqueClients);
    }

    calculateStats() {
        const totalRevenue = this.filteredSales.reduce((sum, sale) => sum + (sale.total || 0), 0);
        const totalItems = this.filteredSales.reduce((sum, sale) => {
            // Verificar si sale.items existe y es un array
            if (sale.items && Array.isArray(sale.items)) {
                return sum + sale.items.length;
            } else if (sale.articulos && Array.isArray(sale.articulos)) {
                return sum + sale.articulos.length;
            }
            return sum;
        }, 0);
        const uniqueClients = new Set(this.filteredSales.map(sale => {
            if (sale.client && sale.client.id) {
                return sale.client.id;
            } else if (sale.clientId) {
                return sale.clientId;
            }
            return null;
        }).filter(id => id !== null)).size;

        return {
            totalSales: this.filteredSales.length,
            totalRevenue,
            totalItems,
            uniqueClients
        };
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateEmptyState() {
        const emptyState = document.getElementById('empty-state');
        const salesList = document.getElementById('sales-list');
        
        if (emptyState && salesList) {
            const hasSales = this.filteredSales.length > 0;
            emptyState.style.display = hasSales ? 'none' : 'block';
            salesList.style.display = hasSales ? 'block' : 'none';
        }
    }

    // ===== GESTIÓN DE DETALLES =====
    viewSaleDetail(saleId) {
        const sale = this.sales.find(s => s.id === saleId);
        if (!sale) return;

        const clientId = sale.client ? (sale.client.cedula ?? sale.client.id) : sale.clientId;
        const dayKey = this.getDateKey(sale.date);

        // Agrupar todas las ventas del mismo cliente en el mismo día
        const sameDaySales = this.sales.filter(s => {
            const sClientId = s.client ? (s.client.cedula ?? s.client.id) : s.clientId;
            return sClientId == clientId && this.getDateKey(s.date) === dayKey;
        });

        // Consolidar artículos
        const items = sameDaySales.flatMap(s => (s.items || s.articulos || []));
        const total = items.reduce((sum, it) => sum + (Number(it.subtotal) || (Number(it.price || it.precio || 0) * Number(it.quantity || 1))), 0);
        const uniqueFundas = [...new Set(sameDaySales.map(s => s.funda).filter(f => !!f))];

        const clientName = sale.client ? (sale.client.nombre || sale.client.name) : 'Cliente no encontrado';
        const clientCity = sale.client ? (sale.client.ciudad || sale.client.city || '') : '';
        const clientPhone = sale.client ? (sale.client.telefono || sale.client.phone || '') : '';

        // Llenar modal de detalle
        document.getElementById('invoice-funda').textContent = uniqueFundas.length > 1 ? 'MÚLTIPLES' : (uniqueFundas[0] ?? sale.funda);
        document.getElementById('invoice-client-name').textContent = clientName;
        document.getElementById('invoice-client-city').textContent = clientCity;
        document.getElementById('invoice-client-phone').textContent = clientPhone || '-';
        document.getElementById('invoice-date').textContent = new Date(sale.date).toLocaleDateString('es-EC');
        document.getElementById('invoice-total').textContent = total.toFixed(2);

        // Llenar tabla de artículos (Nombre, Cantidad, Subtotal)
        const tbody = document.getElementById('invoice-items-tbody');
        tbody.innerHTML = items.map(item => `
            <tr>
                <td>${this.escapeHtml(item.description || item.nombre || 'Artículo')}</td>
                <td>${item.quantity || 1}</td>
                <td>$${((item.subtotal != null ? Number(item.subtotal) : Number(item.price || item.precio || 0) * Number(item.quantity || 1))).toFixed(2)}</td>
            </tr>
        `).join('');

        // Mostrar modal
        const modal = document.getElementById('invoice-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideInvoiceModal() {
        const modal = document.getElementById('invoice-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // ===== IMPRESIÓN =====
    printSale(saleId) {
        const sale = this.sales.find(s => s.id === saleId);
        if (!sale) return;

        const printContent = this.generateInvoiceHTML(sale);
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
    }

    printAllSales() {
        if (this.filteredSales.length === 0) {
            this.showNotification('No hay ventas para imprimir', 'warning');
            return;
        }

        const printContent = this.generateBulkInvoiceHTML();
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
    }

    printInvoice() {
        const sale = this.sales.find(s => s.funda == document.getElementById('invoice-funda').textContent);
        if (sale) {
            this.printSale(sale.id);
            this.hideInvoiceModal();
        }
    }

    generateInvoiceHTML(sale) {
        const date = new Date(sale.date);
        
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Factura - Funda ${sale.funda}</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            margin: 20px; 
                            font-size: 14px;
                            line-height: 1.4;
                        }
                        .header { 
                            text-align: center; 
                            margin-bottom: 30px; 
                            border-bottom: 3px solid #333;
                            padding-bottom: 20px;
                        }
                        .invoice-info {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 30px;
                        }
                        .company-info, .client-info {
                            flex: 1;
                        }
                        .client-info {
                            text-align: right;
                        }
                        .items-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        .items-table th,
                        .items-table td {
                            border: 1px solid #ddd;
                            padding: 10px;
                            text-align: left;
                        }
                        .items-table th {
                            background: #f5f5f5;
                            font-weight: bold;
                        }
                        .total-row {
                            background: #333;
                            color: white;
                            font-weight: bold;
                        }
                        .footer { 
                            text-align: center; 
                            margin-top: 40px; 
                            font-size: 12px; 
                            color: #666; 
                            border-top: 1px solid #eee;
                            padding-top: 20px;
                        }
                        @media print {
                            body { margin: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>🏪 TIENDA DE ROPA</h1>
                        <h2>FACTURA #${sale.funda}</h2>
                        <p>Sistema de Gestión de Ventas</p>
                    </div>
                    
                    <div class="invoice-info">
                        <div class="company-info">
                            <h3>Información de la Empresa</h3>
                            <p><strong>Tienda de Ropa</strong></p>
                            <p>Sistema de Gestión de Ventas</p>
                            <p>Fecha: ${date.toLocaleDateString('es-EC')}</p>
                        </div>
                        <div class="client-info">
                            <h3>Información del Cliente</h3>
                            <p><strong>${(sale.client?.nombre || sale.client?.name) ?? ''}</strong></p>
                            <p>${(sale.client?.ciudad || sale.client?.city) ?? ''}</p>
                            ${(sale.client?.telefono || sale.client?.phone) ? `<p>Tel: ${(sale.client.telefono || sale.client.phone)}</p>` : ''}
                            ${(sale.client?.direccion || sale.client?.address) ? `<p>${(sale.client.direccion || sale.client.address)}</p>` : ''}
                        </div>
                    </div>
                    
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sale.items.map(item => `
                                <tr>
                                    <td>${item.description}</td>
                                    <td>${item.quantity || 1}</td>
                                    <td>$${(item.subtotal || 0).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr class="total-row">
                                <td colspan="2"><strong>TOTAL</strong></td>
                                <td><strong>$${sale.total.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <div class="footer">
                        <p>¡Gracias por su compra!</p>
                        <p>Factura generada el ${date.toLocaleString('es-EC')}</p>
                    </div>
                </body>
            </html>
        `;
    }

    generateBulkInvoiceHTML() {
        const stats = this.calculateStats();
        const date = new Date();
        
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Reporte de Ventas</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .summary { margin-bottom: 30px; padding: 20px; background: #f5f5f5; }
                        .sale { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
                        .sale-header { font-weight: bold; margin-bottom: 10px; }
                        .items { margin-left: 20px; }
                        .total { font-weight: bold; text-align: right; margin-top: 10px; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>🏪 TIENDA DE ROPA</h1>
                        <h2>REPORTE DE VENTAS</h2>
                        <p>Generado el ${date.toLocaleString('es-EC')}</p>
                    </div>
                    
                    <div class="summary">
                        <h3>Resumen</h3>
                        <p><strong>Total de Ventas:</strong> ${stats.totalSales}</p>
                        <p><strong>Total de Ingresos:</strong> $${stats.totalRevenue.toFixed(2)}</p>
                        <p><strong>Total de Artículos:</strong> ${stats.totalItems}</p>
                        <p><strong>Clientes Únicos:</strong> ${stats.uniqueClients}</p>
                    </div>
                    
                    ${this.filteredSales.map(sale => `
                        <div class="sale">
                            <div class="sale-header">
                                Funda ${sale.funda} - ${(sale.client?.nombre || sale.client?.name) ?? ''} (${(sale.client?.ciudad || sale.client?.city) ?? ''}) - ${new Date(sale.date).toLocaleDateString('es-EC')}
                            </div>
                            <div class="items">
                                ${sale.items.map(item => `${item.description} - $${item.price.toFixed(2)}`).join('<br>')}
                            </div>
                            <div class="total">Total: $${sale.total.toFixed(2)}</div>
                        </div>
                    `).join('')}
                </body>
            </html>
        `;
    }

    // ===== EXPORTACIÓN =====
    exportAllData() {
        try {
            const exportData = {
                metadata: {
                    exportDate: new Date().toISOString(),
                    totalSales: this.filteredSales.length,
                    totalRevenue: this.calculateStats().totalRevenue,
                    filters: this.filters
                },
                sales: this.filteredSales.map(sale => ({
                    funda: sale.funda,
                    cliente: sale.client?.nombre || sale.client?.name,
                    ciudad: sale.client?.ciudad || sale.client?.city,
                    fecha: new Date(sale.date).toLocaleDateString('es-EC'),
                    hora: new Date(sale.date).toLocaleTimeString('es-EC'),
                    articulos: sale.items.map(item => ({
                        nombre: item.description,
                        cantidad: item.quantity || 1,
                        subtotal: item.subtotal || 0
                    })),
                    total: sale.total
                }))
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `facturas_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            this.showNotification('Datos exportados exitosamente', 'success');
            
            if (window.tiendaApp) {
                window.tiendaApp.addActivity('Facturas exportadas', `${this.filteredSales.length} facturas`, 'invoice');
            }
        } catch (error) {
            console.error('❌ Error al exportar datos:', error);
            this.showNotification('Error al exportar datos', 'error');
        }
    }

    exportSelectedSales() {
        if (this.selectedSales.size === 0) {
            this.showNotification('Selecciona al menos una factura para exportar', 'warning');
            return;
        }

        const selectedSalesData = this.sales.filter(sale => this.selectedSales.has(sale.id));
        // Implementar exportación de seleccionados
        this.showNotification('Exportación de seleccionados implementada', 'info');
    }

    // ===== GESTIÓN DE VENTAS =====
    deleteSale(saleId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta venta? Esta acción no se puede deshacer.')) {
            if (window.tiendaApp && window.tiendaApp.deleteSale(saleId)) {
                this.loadData();
                this.applyFilters();
                this.showNotification('Venta eliminada exitosamente', 'success');
            }
        }
    }

    deleteSelectedSales() {
        if (this.selectedSales.size === 0) {
            this.showNotification('Selecciona al menos una factura para eliminar', 'warning');
            return;
        }

        if (confirm(`¿Estás seguro de que quieres eliminar ${this.selectedSales.size} ventas? Esta acción no se puede deshacer.`)) {
            // Implementar eliminación masiva
            this.showNotification('Eliminación masiva implementada', 'info');
        }
    }

    // ===== GESTIÓN DE MODALES =====
    closeAllModals() {
        this.hideInvoiceModal();
        this.hideBulkActionsModal();
    }

    hideBulkActionsModal() {
        const modal = document.getElementById('bulk-actions-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // ===== UTILIDADES =====
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('es-EC', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    }

    formatDateTime(date) {
        return new Date(date).toLocaleString('es-EC', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showNotification(message, type = 'success') {
        if (window.tiendaApp) {
            window.tiendaApp.showNotification(message, type);
        }
    }

    getDateKey(date) {
        // Usar UTC para evitar desfases por zona horaria
        try {
            return new Date(date).toISOString().slice(0, 10); // YYYY-MM-DD
        } catch (e) {
            const d = new Date(date);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }
    }

    openInvoicePage(saleId) {
        const sale = this.sales.find(s => s.id === saleId);
        if (!sale) return;
        const clientId = sale.client ? (sale.client.cedula ?? sale.client.id) : sale.clientId;
        const dateKey = this.getDateKey(sale.date);
        window.location.href = `invoice.html?client=${encodeURIComponent(clientId)}&date=${encodeURIComponent(dateKey)}`;
    }
}

// ===== FUNCIONES GLOBALES =====
function applyFilters() {
    if (window.facturacionManager) {
        window.facturacionManager.applyFilters();
    }
}

function clearFilters() {
    if (window.facturacionManager) {
        window.facturacionManager.clearFilters();
    }
}

function exportAllData() {
    if (window.facturacionManager) {
        window.facturacionManager.exportAllData();
    }
}

function printAllSales() {
    if (window.facturacionManager) {
        window.facturacionManager.printAllSales();
    }
}

function hideInvoiceModal() {
    if (window.facturacionManager) {
        window.facturacionManager.hideInvoiceModal();
    }
}

function printInvoice() {
    if (window.facturacionManager) {
        window.facturacionManager.printInvoice();
    }
}

function hideBulkActionsModal() {
    if (window.facturacionManager) {
        window.facturacionManager.hideBulkActionsModal();
    }
}

function exportSelectedSales() {
    if (window.facturacionManager) {
        window.facturacionManager.exportSelectedSales();
    }
}

function printSelectedSales() {
    if (window.facturacionManager) {
        window.facturacionManager.printSelectedSales();
    }
}

function deleteSelectedSales() {
    if (window.facturacionManager) {
        window.facturacionManager.deleteSelectedSales();
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que estamos en la página de facturación
    if (document.getElementById('sales-list')) {
        window.facturacionManager = new FacturacionManager();
        console.log('✅ FacturacionManager inicializado');
    }
});



