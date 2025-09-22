/**
 * ===== MENÚ DESPLEGABLE =====
 * Manejo del menú desplegable de ventas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar menús desplegables
    initDropdowns();
    
    // Detectar tipo de venta desde URL
    detectSaleType();
});

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Toggle del menú al hacer click
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Cerrar otros menús abiertos
                closeOtherDropdowns(dropdown);
                
                // Toggle del menú actual
                menu.classList.toggle('show');
            });
            
            // Cerrar menú al hacer click fuera
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });
        }
    });
}

function closeOtherDropdowns(currentDropdown) {
    const allDropdowns = document.querySelectorAll('.nav-dropdown');
    allDropdowns.forEach(dropdown => {
        if (dropdown !== currentDropdown) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.remove('show');
            }
        }
    });
}

function detectSaleType() {
    // Solo ejecutar en la página de ventas
    if (window.location.pathname.includes('ventas-ropa.html') || window.location.pathname.includes('ventas-chucherias.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const tipo = urlParams.get('tipo');
        
        if (tipo) {
            // Actualizar el título de la página según el tipo
            updateSalePageTitle(tipo);
            
            // Marcar el elemento activo en el menú desplegable
            markActiveDropdownItem(tipo);
        }
    }
}

function updateSalePageTitle(tipo) {
    const pageTitle = document.querySelector('.page-title h2');
    if (pageTitle) {
        if (tipo === 'ropa') {
            pageTitle.textContent = 'Ventas de Ropa';
        } else if (tipo === 'chucherias') {
            pageTitle.textContent = 'Ventas de Chucherías';
        }
    }
    
    // También actualizar el subtítulo si existe
    const pageSubtitle = document.querySelector('.page-title p');
    if (pageSubtitle) {
        if (tipo === 'ropa') {
            pageSubtitle.textContent = 'Registra ventas de prendas y accesorios';
        } else if (tipo === 'chucherias') {
            pageSubtitle.textContent = 'Registra ventas de dulces y snacks';
        }
    }
}

function markActiveDropdownItem(tipo) {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.classList.remove('active');
        if (item.href.includes(`tipo=${tipo}`)) {
            item.classList.add('active');
        }
    });
}

// Función para navegar a ventas con tipo específico
function navigateToSales(tipo) {
    if (tipo === 'ropa') {
        window.location.href = 'ventas-ropa.html';
    } else if (tipo === 'chucherias') {
        window.location.href = 'ventas-chucherias.html';
    }
}

// Exportar funciones para uso global
window.navigateToSales = navigateToSales;

