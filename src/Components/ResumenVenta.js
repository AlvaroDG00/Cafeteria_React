import React from 'react';

function ResumenVenta({ subtotal, igic, total, darkMode }) {
  // Definimos colores que cambien según el modo oscuro
  const bgClass = darkMode ? 'bg-dark border-secondary text-white' : 'bg-light border-primary-subtle';
  const accentText = darkMode ? 'text-info' : 'text-primary';

  return (
    <div className={`p-4 rounded-4 mt-4 border shadow-sm ${bgClass}`} style={{ transition: 'all 0.3s' }}>
      <div className="d-flex justify-content-between mb-2">
        <span className="opacity-75">Subtotal:</span>
        <span className="fw-bold">{subtotal.toFixed(2)}€</span>
      </div>
      
      <div className="d-flex justify-content-between text-danger mb-2">
        <span>Impuestos (7% IGIC):</span>
        <span>{igic.toFixed(2)}€</span>
      </div>
      
      <hr className={darkMode ? 'border-secondary' : 'border-dark-subtle'} />
      
      <div className={`d-flex justify-content-between align-items-center`}>
        <span className="h5 mb-0 fw-bold">TOTAL A PAGAR:</span>
        <span className={`h3 mb-0 fw-bold ${accentText}`}>
          {total.toFixed(2)}€
        </span>
      </div>
    </div>
  );
}

export default ResumenVenta;