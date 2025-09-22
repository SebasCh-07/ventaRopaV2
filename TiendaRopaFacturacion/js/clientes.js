/**
 * 👥 Gestor de Clientes - DE MODA CON VIVI
 * Integrado con la nueva estructura de base de datos
 */

class ClientesManager {
    constructor() {
        this.currentClients = [];
        this.filteredClients = [];
        this.currentSort = { field: 'nombre', direction: 'asc' };
        this.currentFilter = { city: '', search: '' };
        
        this.init();
    }

    init() {
        this.loadClients();
        this.setupEventListeners();
        this.renderClients();
        console.log('👥 ClientesManager inicializado con base de datos');
    }

    loadClients() {
        this.currentClients = window.database.getAllClients();
        this.filteredClients = [...this.currentClients];
        console.log('👥 Clientes cargados desde base de datos:', this.currentClients.length);
    }

    setupEventListeners() {
        // Búsqueda en tiempo real
        const searchInput = document.getElementById('client-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter.search = e.target.value;
                this.performSearch();
            });
        }

        // Filtro por ciudad
        const cityFilter = document.getElementById('city-filter');
        if (cityFilter) {
            cityFilter.addEventListener('change', (e) => {
                this.currentFilter.city = e.target.value;
                this.filterByCity();
            });
        }

        // Botones de acción
        const addClientBtn = document.getElementById('add-client-btn');
        if (addClientBtn) {
            addClientBtn.addEventListener('click', () => this.showAddClientModal());
        }

        const clearFiltersBtn = document.getElementById('clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }
    }

    performSearch() {
        const query = this.currentFilter.search;
        if (!query.trim()) {
            this.filteredClients = [...this.currentClients];
        } else {
            this.filteredClients = window.database.searchClients(query);
        }
        
        this.applyCityFilter();
        this.renderClients();
    }

    filterByCity() {
        this.applyCityFilter();
        this.renderClients();
    }

    applyCityFilter() {
        if (this.currentFilter.city) {
            this.filteredClients = this.filteredClients.filter(
                client => client.ciudad === this.currentFilter.city
            );
        }
    }

    clearFilters() {
        this.currentFilter = { city: '', search: '' };
        
        // Limpiar inputs
        const searchInput = document.getElementById('client-search');
        const cityFilter = document.getElementById('city-filter');
        
        if (searchInput) searchInput.value = '';
        if (cityFilter) cityFilter.value = '';
        
        this.filteredClients = [...this.currentClients];
        this.updateCityFilter();
        this.renderClients();
    }

    updateCityFilter() {
        const cityFilter = document.getElementById('city-filter');
        if (!cityFilter) return;

        const cities = [...new Set(this.currentClients.map(client => client.ciudad))].sort();
        
        cityFilter.innerHTML = '<option value="">Todas las ciudades</option>';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
        });
    }

    sortTable(field) {
        if (this.currentSort.field === field) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.field = field;
            this.currentSort.direction = 'asc';
        }

        this.filteredClients.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (this.currentSort.direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        this.renderClients();
    }

    renderClients() {
        const tbody = document.getElementById('clients-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (this.filteredClients.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        ${this.currentFilter.search || this.currentFilter.city 
                            ? 'No se encontraron clientes con los filtros aplicados' 
                            : 'No hay clientes registrados'}
                    </td>
                </tr>
            `;
            return;
        }

        this.filteredClients.forEach(client => {
            tbody.appendChild(this.renderClientRow(client));
        });

        this.updateCityFilter();
    }

    renderClientRow(client) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${this.escapeHtml(client.nombre)}</td>
            <td>${this.escapeHtml(client.ciudad)}</td>
            <td>${this.escapeHtml(client.telefono || '-')}</td>
            <td>${this.escapeHtml(String(client.cedula))}</td>
            <td>${this.escapeHtml(client.direccion || '-')}</td>
            <td>${this.escapeHtml(client.observacion || '-')}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="clientesManager.editClient(${client.cedula})" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="clientesManager.showDeleteModal(${client.cedula})" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        return row;
    }

    showAddClientModal() {
        const modal = document.getElementById('add-client-modal');
        if (modal) {
            // Limpiar formulario
            const form = modal.querySelector('form');
            if (form) form.reset();
            
            modal.style.display = 'flex';
        }
    }

    showEditClientModal(cedula) {
        const client = this.currentClients.find(c => c.cedula === cedula);
        if (!client) return;

        const modal = document.getElementById('edit-client-modal');
        if (modal) {
            // Llenar formulario con datos del cliente
            document.getElementById('edit-client-cedula').value = client.cedula;
            document.getElementById('edit-client-cedula-display').value = client.cedula;
            document.getElementById('edit-client-nombre').value = client.nombre;
            document.getElementById('edit-client-ciudad').value = client.ciudad;
            document.getElementById('edit-client-telefono').value = client.telefono || '';
            document.getElementById('edit-client-direccion').value = client.direccion || '';
            document.getElementById('edit-client-observacion').value = client.observacion || '';
            
            modal.style.display = 'flex';
        }
    }

    showDeleteModal(cedula) {
        const client = this.currentClients.find(c => c.cedula === cedula);
        if (!client) return;

        const modal = document.getElementById('delete-client-modal');
        if (modal) {
            document.getElementById('delete-client-name').textContent = client.nombre;
            document.getElementById('delete-client-cedula').value = cedula;
            modal.style.display = 'flex';
        }
    }

    addClient(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const clientData = {
            nombre: formData.get('nombre').trim(),
            ciudad: formData.get('ciudad').trim(),
            telefono: formData.get('telefono').trim(),
            direccion: formData.get('direccion').trim(),
            observacion: formData.get('observacion').trim()
        };

        // Validación
        if (!clientData.nombre || !clientData.ciudad) {
            this.showNotification('Nombre y ciudad son obligatorios', 'error');
            return;
        }

        try {
            const newClient = window.database.addClient(clientData);
            this.loadClients();
            this.renderClients();
            this.closeModal('add-client-modal');
            this.showNotification('Cliente agregado exitosamente', 'success');
            console.log('👥 Cliente agregado:', newClient);
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            this.showNotification('Error al agregar cliente', 'error');
        }
    }

    updateClient(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const cedula = parseInt(formData.get('cedula'));
        const clientData = {
            nombre: formData.get('nombre').trim(),
            ciudad: formData.get('ciudad').trim(),
            telefono: formData.get('telefono').trim(),
            direccion: formData.get('direccion').trim(),
            observacion: formData.get('observacion').trim()
        };

        // Validación
        if (!clientData.nombre || !clientData.ciudad) {
            this.showNotification('Nombre y ciudad son obligatorios', 'error');
            return;
        }

        try {
            const updatedClient = window.database.updateClient(cedula, clientData);
            if (updatedClient) {
                this.loadClients();
                this.renderClients();
                this.closeModal('edit-client-modal');
                this.showNotification('Cliente actualizado exitosamente', 'success');
                console.log('👥 Cliente actualizado:', updatedClient);
            } else {
                this.showNotification('Cliente no encontrado', 'error');
            }
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            this.showNotification('Error al actualizar cliente', 'error');
        }
    }

    deleteClient(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const cedula = parseInt(formData.get('cedula'));

        try {
            // Verificar si el cliente tiene ventas asociadas
            const ventasRopa = window.database.getTable('ventas_ropa');
            const ventasChucheria = window.database.getTable('ventas_chucheria');
            
            const tieneVentas = ventasRopa.some(v => v.idCliente === cedula) || 
                              ventasChucheria.some(v => v.idCliente === cedula);
            
            if (tieneVentas) {
                this.showNotification('No se puede eliminar el cliente porque tiene ventas asociadas', 'error');
                return;
            }

            window.database.deleteClient(cedula);
            this.loadClients();
            this.renderClients();
            this.closeModal('delete-client-modal');
            this.showNotification('Cliente eliminado exitosamente', 'success');
            console.log('👥 Cliente eliminado:', cedula);
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            this.showNotification('Error al eliminar cliente', 'error');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showNotification(message, type = 'info') {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos
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
        
        // Colores según tipo
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Método para obtener clientes (compatibilidad)
    getClients() {
        return this.currentClients;
    }

    // Método para obtener un cliente por cédula
    getClientByCedula(cedula) {
        return window.database.getClientByCedula(cedula);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.clientesManager = new ClientesManager();
});
