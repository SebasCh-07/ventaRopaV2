function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function getDateKey(date) {
    try {
        return new Date(date).toISOString().slice(0, 10);
    } catch (e) {
        const d = new Date(date);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
}

function formatCurrency(n) {
    return new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n || 0);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

document.addEventListener('DOMContentLoaded', () => {
    const clientId = getQueryParam('client');
    const dateKey = getQueryParam('date');

    if (!window.database || !clientId || !dateKey) {
        setText('invoice-summary', 'No se encontraron datos de factura.');
        return;
    }

    // Reconstituir ventas completas
    const ventasRopa = window.database.getVentasRopaCompletas() || [];
    const ventasCh = window.database.getVentasChucheriaCompletas() || [];
    const sales = [];

    // Normalizar a la misma estructura usada en facturación
    const pushVenta = (venta, tipo) => {
        const cliente = venta.cliente ? {
            id: venta.cliente.cedula,
            cedula: venta.cliente.cedula,
            nombre: venta.cliente.nombre,
            ciudad: venta.cliente.ciudad,
            telefono: venta.cliente.telefono,
            direccion: venta.cliente.direccion
        } : null;
        const quantity = Number(venta.cantidad || 1);
        const price = Number(venta.producto?.precio || 0);
        const itemSubtotal = price * quantity;
        sales.push({
            id: venta.id,
            funda: venta.factura?.funda || 0,
            client: cliente,
            items: [{ description: venta.producto?.nombre || 'Artículo', quantity, subtotal: itemSubtotal }],
            total: itemSubtotal,
            date: venta.fecha,
            tipo
        });
    };

    ventasRopa.forEach(v => pushVenta(v, 'ropa'));
    ventasCh.forEach(v => pushVenta(v, 'chucherias'));

    // Filtrar por cliente y día
    const sameDaySales = sales.filter(s => {
        const sClientId = s.client ? (s.client.cedula ?? s.client.id) : s.clientId;
        return String(sClientId) === String(clientId) && getDateKey(s.date) === String(dateKey);
    });

    if (sameDaySales.length === 0) {
        setText('invoice-summary', 'No hay datos para los filtros enviados.');
        return;
    }

    // Consolidar
    const allItems = sameDaySales.flatMap(s => s.items || []);
    const total = allItems.reduce((sum, it) => sum + Number(it.subtotal || 0), 0);
    const fundas = [...new Set(sameDaySales.map(s => s.funda).filter(Boolean))];
    const representative = sameDaySales[0];
    const client = representative.client || {};
    const tipo = (sameDaySales.every(s => s.tipo === 'chucherias')) ? 'CHUCHERIAS' : 'ROPA';

    // Poblar encabezados
    setText('invoice-number', `N°: ${fundas.length ? String(fundas[0]).padStart(2, '0') : '--'}`);
    setText('invoice-date', `Fecha: ${new Date(representative.date).toLocaleDateString('es-EC')}`);

    // Cliente
    setText('client-name', client.nombre || '-');
    setText('client-city', client.ciudad || '-');
    setText('client-phone', client.telefono || '-');

    // Fundas y resumen
    setText('invoice-fundas', `Fundas: ${fundas.length ? fundas.join(', ') : '-'}`);
    setText('invoice-summary', `${allItems.length} artículos`);

    // Líneas
    const tbody = document.getElementById('invoice-lines');
    tbody.innerHTML = allItems.map(it => `
        <tr>
            <td>${it.description}</td>
            <td class="right">${it.quantity || 1}</td>
            <td class="right">${formatCurrency((it.subtotal || 0) / (it.quantity || 1))}</td>
            <td class="right">${formatCurrency(it.subtotal || 0)}</td>
        </tr>
    `).join('');

    document.getElementById('invoice-total').textContent = formatCurrency(total);
});


