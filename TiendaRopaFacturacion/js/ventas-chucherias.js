/**
 * 🍭 Gestor de Ventas de Chucherías - DE MODA CON VIVI
 * Integrado con la nueva estructura de base de datos
 */

class VentasChucheriasManager {
    constructor() {
        this.currentSale = {
            cliente: null,
            articulos: [],
            total: 0
        };
        this.sales = [];
        this.clients = [];
        this.categories = [];
        this.products = [];
        this.currentCategory = null;
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderSales();
        this.updateDisplay();
        console.log('🍭 VentasChucheriasManager inicializado con base de datos');
    }

    loadData() {
        this.sales = window.database.getVentasChucheriaCompletas();
        this.clients = window.database.getAllClients();
        this.categories = window.database.getCategoriasChucherias();
        this.products = window.database.getTable('chucherias');
        
        console.log('🍭 Datos cargados:', {
            ventas: this.sales.length,
            clientes: this.clients.length,
            categorias: this.categories.length,
            productos: this.products.length
        });
    }

    setupEventListeners() {
        // Botón nueva venta
        const newSaleBtn = document.getElementById('new-sale-btn');
        if (newSaleBtn) {
            newSaleBtn.addEventListener('click', () => this.startNewSale());
        }

        // Botón finalizar venta
        const finalizeBtn = document.getElementById('finalize-sale-btn');
        if (finalizeBtn) {
            finalizeBtn.addEventListener('click', () => this.finalizeSale());
        }

        // Botón agregar artículo
        const addItemBtn = document.getElementById('add-item-btn');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => this.showArticulosModal());
        }


        // Botón continuar en modal de artículos
        const continueBtn = document.getElementById('continue-articulos-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.continueFromArticulos());
        }

        // Botón cancelar en modal de artículos
        const cancelBtn = document.getElementById('cancel-articulos-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.cancelFromArticulos());
        }

        // Campo de búsqueda de clientes
        const clientSearchInput = document.getElementById('client-search-input');
        if (clientSearchInput) {
            clientSearchInput.addEventListener('input', () => this.renderClientsInModal());
        }

        // Cerrar modales
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
    }

    startNewSale() {
        this.currentSale = {
            cliente: null,
            articulos: [],
            total: 0
        };
        this.updateDisplay();
        this.showAddSaleModal();
    }

    showAddSaleModal() {
        const modal = document.getElementById('add-sale-modal');
        if (modal) {
            // Limpiar campo de búsqueda
            const searchInput = document.getElementById('client-search-input');
            if (searchInput) searchInput.value = '';
            
            // Renderizar clientes en la tabla
            this.renderClientsInModal();
            
            modal.style.display = 'flex';
        }
    }

    renderClientsInModal() {
        const tbody = document.getElementById('client-list-body');
        if (!tbody) return;
        const searchInput = document.getElementById('client-search-input');
        const query = (searchInput?.value || '').toLowerCase().trim();

        let list = [...this.clients];
        if (query) {
            list = list.filter(c => c.nombre.toLowerCase().includes(query) || String(c.cedula).includes(query));
        }

        tbody.innerHTML = '';
        list.forEach(client => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${this.escapeHtml(client.nombre)}</td>
                <td>${this.escapeHtml(String(client.cedula))}</td>
                <td>${this.escapeHtml(client.telefono || '-')}</td>
                <td><button type="button" class="btn btn-sm btn-primary">Seleccionar</button></td>
            `;
            tr.querySelector('button').onclick = () => this.selectClientFromList(client.cedula);
            tbody.appendChild(tr);
        });
    }

    selectClientFromList(cedula) {
        const client = this.clients.find(c => c.cedula === cedula);
        if (!client) {
            this.showNotification('Cliente no encontrado', 'error');
            return;
        }
        this.currentSale.cliente = client;
        this.closeModal('add-sale-modal');
        this.updateDisplay();
        this.showNotification('Cliente seleccionado. Ahora puede agregar artículos.', 'success');
    }


    showArticulosModal() {
        if (!this.currentSale.cliente) {
            this.showNotification('Debe seleccionar un cliente primero', 'error');
            return;
        }

        const modal = document.getElementById('articulos-modal');
        if (modal) {
            // Ocultar botón continuar al abrir el modal
            this.hideContinueButton();
            this.renderCategories();
            modal.style.display = 'flex';
        }
    }

    renderCategories() {
        const categoriesContainer = document.getElementById('categories-container');
        if (!categoriesContainer) return;

        categoriesContainer.innerHTML = '';
        
        this.categories.forEach(category => {
            const categoryBtn = document.createElement('button');
            categoryBtn.className = `category-btn ${this.currentCategory === category.id ? 'active' : ''}`;
            categoryBtn.textContent = category.name;
            categoryBtn.setAttribute('data-category-id', category.id);
            categoryBtn.onclick = () => this.toggleCategoria(category.id);
            categoriesContainer.appendChild(categoryBtn);
        });
    }

    toggleCategoria(categoriaId) {
        this.currentCategory = this.currentCategory === categoriaId ? null : categoriaId;
        this.renderProducts();
        this.updateCategoryButtons();
    }

    updateCategoryButtons() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            // Obtener el ID de la categoría desde el data attribute
            const categoryId = parseInt(btn.getAttribute('data-category-id'));
            btn.classList.toggle('active', this.currentCategory === categoryId);
        });
    }

    renderProducts() {
        const productsContainer = document.getElementById('products-container');
        if (!productsContainer) return;

        productsContainer.innerHTML = '';

        if (!this.currentCategory) {
            productsContainer.innerHTML = '<p class="text-muted">Seleccione una categoría para ver los productos</p>';
            return;
        }

        const categoryProducts = this.products.filter(p => p.idCategoriaChucheria === this.currentCategory);
        
        if (categoryProducts.length === 0) {
            productsContainer.innerHTML = '<p class="text-muted">No hay productos en esta categoría</p>';
            return;
        }

        categoryProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-info">
                    <h4>${this.escapeHtml(product.nombre)}</h4>
                    <p class="price">$${product.precio.toFixed(2)}</p>
                </div>
                <div class="product-actions">
                    <input type="number" min="1" value="1" class="quantity-input" id="qty-${product.id}">
                    <button class="btn btn-sm btn-primary" onclick="ventasChucheriasManager.addArticulo(${product.id})">
                        Agregar
                    </button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    addArticulo(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const quantityInput = document.getElementById(`qty-${productId}`);
        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

        // Verificar si el producto ya está en la venta
        const existingItem = this.currentSale.articulos.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.cantidad += quantity;
        } else {
            this.currentSale.articulos.push({
                id: productId,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: quantity
            });
        }

        this.calculateTotal();
        this.updateDisplay();
        this.showNotification(`${product.nombre} agregado a la venta`, 'success');
        
        // Mostrar botón continuar
        this.showContinueButton();
    }

    calculateTotal() {
        this.currentSale.total = this.currentSale.articulos.reduce((sum, item) => {
            return sum + (item.precio * item.cantidad);
        }, 0);
    }

    removeArticulo(productId) {
        this.currentSale.articulos = this.currentSale.articulos.filter(item => item.id !== productId);
        this.calculateTotal();
        this.updateDisplay();
    }

    finalizeSale() {
        if (!this.currentSale.cliente) {
            this.showNotification('Debe seleccionar un cliente', 'error');
            return;
        }

        if (this.currentSale.articulos.length === 0) {
            this.showNotification('Debe agregar al menos un artículo', 'error');
            return;
        }

        try {
            // Crear ventas individuales para cada artículo
            const ventasIds = [];
            this.currentSale.articulos.forEach(articulo => {
                const ventaData = {
                    fecha: new Date().toISOString().split('T')[0],
                    idCliente: this.currentSale.cliente.cedula,
                    idChucherias: articulo.id,
                    cantidad: articulo.cantidad
                };
                
                const venta = window.database.createVentaChucheria(ventaData);
                ventasIds.push(venta.id);
            });

            // Crear factura con todos los IDs de ventas
            const facturaData = {
                idVentasChucheria: ventasIds,
                subtotal: this.currentSale.total,
                total: this.currentSale.total
            };
            
            const factura = window.database.createFacturaChucheria(facturaData);
            
            this.showNotification(`Venta finalizada. Funda: ${factura.funda}`, 'success');
            console.log('🍭 Venta finalizada:', factura);
            
            // Limpiar venta actual
            this.currentSale = {
                cliente: null,
                articulos: [],
                total: 0
            };
            
            this.loadData();
            this.renderSales();
            this.updateDisplay();
            
        } catch (error) {
            console.error('Error al finalizar venta:', error);
            this.showNotification('Error al finalizar la venta', 'error');
        }
    }

    updateDisplay() {
        this.updateClientDisplay();
        this.updateItemsDisplay();
        this.updateTotalDisplay();
        this.updateButtonsState();
    }

    updateClientDisplay() {
        const clientDisplay = document.getElementById('current-client');
        if (clientDisplay) {
            if (this.currentSale.cliente) {
                clientDisplay.innerHTML = `
                    <strong>Cliente:</strong> ${this.escapeHtml(this.currentSale.cliente.nombre)} - ${this.escapeHtml(this.currentSale.cliente.ciudad)}
                `;
            } else {
                clientDisplay.innerHTML = '<span class="text-muted">No hay cliente seleccionado</span>';
            }
        }
    }

    updateItemsDisplay() {
        const itemsContainer = document.getElementById('current-items');
        if (!itemsContainer) return;

        if (this.currentSale.articulos.length === 0) {
            itemsContainer.innerHTML = '<p class="text-muted">No hay artículos en la venta</p>';
            return;
        }

        itemsContainer.innerHTML = this.currentSale.articulos.map(item => `
            <div class="sale-item">
                <div class="item-info">
                    <span class="item-name">${this.escapeHtml(item.nombre)}</span>
                    <span class="item-quantity">x${item.cantidad}</span>
                </div>
                <div class="item-price">
                    $${(item.precio * item.cantidad).toFixed(2)}
                    <button class="btn btn-sm btn-danger" onclick="ventasChucheriasManager.removeArticulo(${item.id})">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateTotalDisplay() {
        const totalDisplay = document.getElementById('current-total');
        if (totalDisplay) {
            totalDisplay.textContent = `$${this.currentSale.total.toFixed(2)}`;
        }
    }

    updateButtonsState() {
        const addItemBtn = document.getElementById('add-item-btn');
        const finalizeBtn = document.getElementById('finalize-sale-btn');
        
        // Habilitar "Agregar Artículo" si hay un cliente seleccionado
        if (addItemBtn) {
            addItemBtn.disabled = !this.currentSale.cliente;
        }
        
        // Habilitar "Finalizar Venta" si hay un cliente y al menos un artículo
        if (finalizeBtn) {
            finalizeBtn.disabled = !this.currentSale.cliente || this.currentSale.articulos.length === 0;
        }
    }

    showContinueButton() {
        const footer = document.getElementById('articulos-modal-footer');
        if (footer) {
            footer.style.display = 'block';
        }
    }

    hideContinueButton() {
        const footer = document.getElementById('articulos-modal-footer');
        if (footer) {
            footer.style.display = 'none';
        }
    }

    continueFromArticulos() {
        this.closeModal('articulos-modal');
        this.showNotification('Artículos agregados. Puede continuar agregando más o finalizar la venta.', 'success');
    }

    cancelFromArticulos() {
        this.closeModal('articulos-modal');
        this.showNotification('Operación cancelada.', 'info');
    }

    renderSales() {
        const tbody = document.getElementById('sales-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (this.sales.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">No hay ventas registradas</td>
                </tr>
            `;
            return;
        }

        // Agrupar ventas por factura
        const facturas = this.groupSalesByInvoice();
        
        facturas.forEach(factura => {
            tbody.appendChild(this.renderSaleRow(factura));
        });
    }

    groupSalesByInvoice() {
        const facturas = window.database.getTable('factura_chucheria');
        const ventas = window.database.getTable('ventas_chucheria');
        const clientes = window.database.getTable('clientes');
        const chucherias = window.database.getTable('chucherias');

        return facturas.map(factura => {
            const ventasFactura = ventas.filter(v => Array.isArray(factura.idVentasChucheria) ? factura.idVentasChucheria.includes(v.id) : v.id === factura.idVentasChucheria);
            const cliente = clientes.find(c => c.cedula === ventasFactura[0]?.idCliente);
            const articulos = ventasFactura.map(v => {
                const producto = chucherias.find(ch => ch.id === v.idChucherias);
                return {
                    nombre: producto?.nombre || 'Producto no encontrado',
                    precio: producto?.precio || 0,
                    cantidad: v.cantidad
                };
            });

            return {
                funda: factura.funda,
                cliente: cliente,
                articulos: articulos,
                total: factura.total,
                fecha: ventasFactura[0]?.fecha || ''
            };
        });
    }

    renderSaleRow(factura) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Funda ${factura.funda}</td>
            <td>${this.escapeHtml(factura.cliente?.nombre || 'Cliente no encontrado')}</td>
            <td>${this.escapeHtml(factura.cliente?.ciudad || '')}</td>
            <td>${factura.fecha}</td>
            <td>${factura.articulos.length} artículo${factura.articulos.length !== 1 ? 's' : ''}</td>
            <td>$${factura.total.toFixed(2)}</td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-info" onclick="ventasChucheriasManager.viewArticulos(${factura.funda})" title="Ver artículos">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="ventasChucheriasManager.printSale(${factura.funda})" title="Imprimir">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 6,2 18,2 18,9"></polyline>
                            <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"></path>
                            <polyline points="6,14 18,14 18,18 6,18"></polyline>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        return row;
    }

    viewArticulos(funda) {
        const facturas = this.groupSalesByInvoice();
        const factura = facturas.find(f => f.funda === funda);
        
        if (!factura) {
            this.showNotification('Factura no encontrada', 'error');
            return;
        }

        const modal = document.getElementById('view-articles-modal');
        if (modal) {
            // Llenar información de la factura
            document.getElementById('invoice-funda').textContent = `Funda ${factura.funda}`;
            document.getElementById('invoice-client-name').textContent = factura.cliente?.nombre || 'Cliente no encontrado';
            document.getElementById('invoice-client-city').textContent = factura.cliente?.ciudad || '';
            document.getElementById('invoice-date').textContent = factura.fecha;
            document.getElementById('invoice-total').textContent = `$${factura.total.toFixed(2)}`;

            // Llenar tabla de artículos
            const tbody = document.getElementById('invoice-items-tbody');
            tbody.innerHTML = factura.articulos.map(item => `
                <tr>
                    <td>${this.escapeHtml(item.nombre)}</td>
                    <td>${item.cantidad}</td>
                    <td>$${item.precio.toFixed(2)}</td>
                    <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
                </tr>
            `).join('');

            modal.style.display = 'flex';
        }
    }

    printSale(funda) {
        const facturas = this.groupSalesByInvoice();
        const factura = facturas.find(f => f.funda === funda);
        
        if (!factura) {
            this.showNotification('Factura no encontrada', 'error');
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(this.generateReceiptHTML(factura));
        printWindow.document.close();
        printWindow.print();
    }

    generateReceiptHTML(factura) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Recibo - Funda ${factura.funda}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .client-info { margin-bottom: 20px; }
                    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .total { text-align: right; font-weight: bold; font-size: 18px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>DE MODA CON VIVI</h1>
                    <h2>Recibo de Venta - Funda ${factura.funda}</h2>
                </div>
                
                <div class="client-info">
                    <p><strong>Cliente:</strong> ${this.escapeHtml(factura.cliente?.nombre || 'Cliente no encontrado')}</p>
                    <p><strong>Ciudad:</strong> ${this.escapeHtml(factura.cliente?.ciudad || '')}</p>
                    <p><strong>Fecha:</strong> ${factura.fecha}</p>
                </div>
                
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Artículo</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${factura.articulos.map(item => `
                            <tr>
                                <td>${this.escapeHtml(item.nombre)}</td>
                                <td>${item.cantidad}</td>
                                <td>$${item.precio.toFixed(2)}</td>
                                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="total">
                    <p>Total: $${factura.total.toFixed(2)}</p>
                </div>
            </body>
            </html>
        `;
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            
            // Ocultar botón continuar al cerrar modal de artículos
            if (modalId === 'articulos-modal') {
                this.hideContinueButton();
            }
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.ventasChucheriasManager = new VentasChucheriasManager();
});
