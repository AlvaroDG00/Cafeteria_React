import React, { useState } from 'react';
import { menuItems } from './data';
import FilaProducto from './Components/FilaProducto';
import ResumenVenta from './Components/ResumenVenta';

function App() {
  // --- ESTADOS ---
  // Guardamos un objeto donde el ID del producto es la clave y su cantidad el valor
  const [listaCantidades, setListaCantidades] = useState({});
  // Controlamos si la pantalla está en modo oscuro (true) o claro (false)
  const [esModoOscuro, setEsModoOscuro] = useState(false);

  // --- FUNCIONES DE LÓGICA ---
  
  // Esta función se activa cuando pulsas + o - en cualquier producto
  const actualizarCantidad = (idProducto, nuevaCantidad) => {
    // Si por algún error el número no es válido o es menor a 0, lo ponemos en 0
    const cantidadSegura = isNaN(nuevaCantidad) || nuevaCantidad < 0 ? 0 : nuevaCantidad;
    
    // Actualizamos el estado copiando lo que había antes (...prev) y cambiando solo el ID actual
    setListaCantidades(previo => ({ 
      ...previo, 
      [idProducto]: cantidadSegura 
    }));
  };

  // Función para resetear todas las cantidades a cero
  const borrarPedido = () => setListaCantidades({});

  // --- CÁLCULOS FINALES ---

  // Calculamos el subtotal multiplicando cada precio por su cantidad seleccionada
  const sumaSubtotal = menuItems.reduce((acumulado, productoActual) => {
    const unidades = listaCantidades[productoActual.id] || 0;
    return acumulado + (unidades * productoActual.precio);
  }, 0);

  const calculoIGIC = sumaSubtotal * 0.07; // 7% de impuestos canarios
  const precioTotalFinal = sumaSubtotal + calculoIGIC;

  // --- ESTILOS DINÁMICOS ---
  // Definimos colores de fondo generales según el tema seleccionado
  const colorFondoPantalla = esModoOscuro ? 'bg-dark text-light' : 'bg-light text-dark';

  return (
    // Contenedor principal con transición suave para el cambio de color
    <div className={`min-vh-100 py-4 ${colorFondoPantalla}`} style={{ transition: 'all 0.3s' }}>
      <div className="container">
        
        {/* Botón superior para cambiar el Tema */}
        <div className="d-flex justify-content-end mb-3">
          <button 
            className={`btn ${esModoOscuro ? 'btn-warning' : 'btn-outline-dark'} rounded-pill px-4`}
            onClick={() => setEsModoOscuro(!esModoOscuro)}
          >
            {esModoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-7">
            {/* Tarjeta principal que contiene el formulario */}
            <div className={`card shadow-lg border-0 ${esModoOscuro ? 'bg-secondary text-white' : 'bg-white'}`} style={{ borderRadius: '25px' }}>
              
              {/* Encabezado con el nombre del IES */}
              <div className={`p-4 text-center rounded-top-5 ${esModoOscuro ? 'bg-dark text-info' : 'bg-primary text-white'}`}>
                <h2 className="fw-bold mb-0">IES Lomo de la Herradura</h2>
                <p className="small mb-0 opacity-75">Gestión de Cafetería Moderna</p>
              </div>

              <div className="card-body p-4">
                
                {/* Sección 1: Lista de Productos del Menú */}
                <div className="mb-4">
                  {menuItems.map(productoActual => (
                    <FilaProducto 
                      key={productoActual.id}
                      item={productoActual}
                      cantidad={listaCantidades[productoActual.id] || 0}
                      onCantidadChange={actualizarCantidad}
                      darkMode={esModoOscuro}
                    />
                  ))}
                </div>

                {/* Sección 2: El resumen de precios (Componente externo) */}
                <ResumenVenta 
                  subtotal={sumaSubtotal} 
                  igic={calculoIGIC} 
                  total={precioTotalFinal} 
                  darkMode={esModoOscuro} 
                />

                {/* Sección 3: Botones de acción final */}
                <div className="d-flex gap-3 mt-4">
                  <button className="btn btn-outline-danger btn-lg w-100 fw-bold" onClick={borrarPedido}>
                    Limpiar Pedido
                  </button>
                  <button className="btn btn-success btn-lg w-100 fw-bold shadow" onClick={() => alert('¡Venta realizada con éxito!')}>
                    Pagar pedido
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;