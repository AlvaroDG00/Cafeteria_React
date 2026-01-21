import React from 'react';

function FilaProducto({ item, cantidad, onCantidadChange, darkMode }) {
  const incrementar = () => onCantidadChange(item.id, cantidad + 1);
  const decrementar = () => { if (cantidad > 0) onCantidadChange(item.id, cantidad - 1); };

  // Colores dinámicos para el modo oscuro
  const rowClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light';

  return (
    <div className={`d-flex align-items-center justify-content-between p-3 mb-2 rounded-3 shadow-sm border ${rowClass}`}>
      <div className="flex-grow-1">
        <h6 className="mb-0 fw-bold">{item.nombre}</h6>
        <small className={darkMode ? 'text-info' : 'text-primary'}>{item.precio.toFixed(2)}€</small>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn btn-outline-danger rounded-circle p-0 d-flex align-items-center justify-content-center"
          style={{ width: '35px', height: '35px' }}
          onClick={decrementar}
        >
          -
        </button>

        <span className="fw-bold fs-5" style={{ minWidth: '25px', textAlign: 'center' }}>
          {cantidad}
        </span>

        <button 
          className="btn btn-success rounded-circle p-0 d-flex align-items-center justify-content-center"
          style={{ width: '35px', height: '35px' }}
          onClick={incrementar}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default FilaProducto;