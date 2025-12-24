let carrito = {};

function mas(btn) {
    const p = btn.closest('.producto');
    const nombre = p.dataset.nombre;
    const precio = parseFloat(p.dataset.precio);

    if (!carrito[nombre]) carrito[nombre] = { precio: precio, cantidad: 0 };
    carrito[nombre].cantidad++;
    
    p.querySelector('.cantidad').textContent = carrito[nombre].cantidad;
    actualizarCarrito();
}

function menos(btn) {
    const p = btn.closest('.producto');
    const nombre = p.dataset.nombre;

    if (carrito[nombre] && carrito[nombre].cantidad > 0) {
        carrito[nombre].cantidad--;
        p.querySelector('.cantidad').textContent = carrito[nombre].cantidad;
        if (carrito[nombre].cantidad === 0) delete carrito[nombre];
        actualizarCarrito();
    }
}

function borrar(nombre) {
    delete carrito[nombre];
    document.querySelectorAll('.producto').forEach(p => {
        if(p.dataset.nombre === nombre) p.querySelector('.cantidad').textContent = "0";
    });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalElem = document.getElementById('total');
    let total = 0;
    lista.innerHTML = "";

    const items = Object.keys(carrito);
    if (items.length === 0) {
        lista.innerHTML = '<p class="vacio">Vacío</p>';
    } else {
        items.forEach(n => {
            let sub = carrito[n].precio * carrito[n].cantidad;
            total += sub;
            lista.innerHTML += `
                <div class="item-carrito">
                    <span>${n} (x${carrito[n].cantidad})</span>
                    <span>S/ ${sub.toFixed(2)} <button class="btn-del" onclick="borrar('${n}')">x</button></span>
                </div>`;
        });
    }
    totalElem.textContent = total.toFixed(2);
    generarLink(total);
}

function generarLink(total) {
    const nom = document.getElementById('cliente-nombre').value;
    const dir = document.getElementById('cliente-direccion').value;
    const btn = document.getElementById('whatsapp-link');
    
    let texto = `*PEDIDO MAC CHICKEN*%0A`;
    Object.keys(carrito).forEach(n => {
        texto += `• ${n} x${carrito[n].cantidad} - S/ ${(carrito[n].precio * carrito[n].cantidad).toFixed(2)}%0A`;
    });
    texto += `%0A*TOTAL: S/ ${total.toFixed(2)}*%0A`;
    texto += `*Cliente:* ${nom || 'No indicado'}%0A`;
    texto += `*Dirección:* ${dir || 'No indicada'}`;

    btn.href = `https://wa.me/51928371660?text=${texto}`; // Cambia el 51999... por tu número
}

// Actualizar link al escribir datos del cliente
document.getElementById('cliente-nombre').addEventListener('input', () => actualizarCarrito());
document.getElementById('cliente-direccion').addEventListener('input', () => actualizarCarrito());
