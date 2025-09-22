/**
 * INDEX.JS - Lógica específica para la página principal
 * Dashboard, estadísticas y navegación
 */

class DashboardManager {
    constructor() {
        this.stats = {};
        this.recentActivities = [];
        
        this.init();
    }

    init() {
        this.loadStats();
        this.updateDashboard();
        this.setupEventListeners();
        this.loadRecentActivities();
    }

    setupEventListeners() {
        // Eventos de teclado globales
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '1') {
                e.preventDefault();
                navigateTo('clientes.html');
            }
            if (e.ctrlKey && e.key === '2') {
                e.preventDefault();
                navigateTo('ventas-ropa.html');
            }
            if (e.ctrlKey && e.key === '3') {
                e.preventDefault();
                navigateTo('facturacion.html');
            }
        });

        // Actualizar estadísticas cada 30 segundos
        setInterval(() => {
            this.loadStats();
            this.updateDashboard();
        }, 30000);
    }

    loadStats() {
        if (window.database) {
            this.stats = window.database.getStats();
        }
    }

    updateDashboard() {
        this.updateSummaryCards();
        this.updateStatsCards();
        this.updateActivitySection();
    }

    updateSummaryCards() {
        // Actualizar tarjetas principales
        this.updateElement('total-clients', this.stats.totalClients || 0);
        this.updateElement('sales-today', this.stats.salesToday || 0);
        this.updateElement('total-fundas', this.stats.totalFundas || 0);
    }

    updateStatsCards() {
        // Actualizar estadísticas detalladas
        this.updateElement('monthly-sales', this.formatCurrency(this.stats.monthlyRevenue || 0));
        this.updateElement('items-sold', this.stats.totalItems || 0);
        this.updateElement('top-client', this.stats.topClient || '-');
        this.updateElement('avg-sale', this.formatCurrency(this.stats.avgSale || 0));
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    loadRecentActivities() {
        if (window.tiendaApp) {
            this.recentActivities = window.tiendaApp.recentActivities || [];
        }
        this.updateActivitySection();
    }

    updateActivitySection() {
        const container = document.getElementById('recent-activity');
        if (!container) return;

        if (this.recentActivities.length === 0) {
            container.innerHTML = `
                <div class="activity-item">
                    <div class="activity-icon">ℹ️</div>
                    <div class="activity-content">
                        <p>Bienvenido al sistema. Comienza agregando clientes y registrando ventas.</p>
                        <span class="activity-time">Ahora</span>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.recentActivities.slice(0, 5).map(activity => {
            const timeAgo = this.getTimeAgo(activity.timestamp);
            const icon = this.getActivityIcon(activity.type);
            
            return `
                <div class="activity-item">
                    <div class="activity-icon">${icon}</div>
                    <div class="activity-content">
                        <p><strong>${activity.action}:</strong> ${activity.description}</p>
                        <span class="activity-time">${timeAgo}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    getActivityIcon(type) {
        const icons = {
            client: '👥',
            sale: '🛍️',
            invoice: '📋',
            general: 'ℹ️'
        };
        return icons[type] || icons.general;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);

        if (diffInSeconds < 60) return 'Hace un momento';
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
        return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('es-EC', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    }

    // ===== ACCIONES RÁPIDAS =====
    quickAction(action) {
        switch (action) {
            case 'add_client':
                navigateTo('clientes.html');
                break;
            case 'new_sale':
                navigateTo('ventas-ropa.html');
                break;
            case 'view_invoices':
                navigateTo('facturacion.html');
                break;
            case 'export_data':
                if (window.tiendaApp) {
                    window.tiendaApp.exportAllData();
                }
                break;
            case 'backup_data':
                this.createBackup();
                break;
        }
    }

    createBackup() {
        if (window.tiendaApp) {
            window.tiendaApp.exportAllData();
            this.showNotification('Backup creado exitosamente', 'success');
        }
    }

    showNotification(message, type = 'success') {
        if (window.tiendaApp) {
            window.tiendaApp.showNotification(message, type);
        }
    }
}

// ===== FUNCIONES GLOBALES =====
function navigateTo(url) {
    window.location.href = url;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que estamos en la página principal
    if (document.getElementById('total-clients')) {
        window.dashboardManager = new DashboardManager();
        console.log('✅ DashboardManager inicializado');
    }
});



