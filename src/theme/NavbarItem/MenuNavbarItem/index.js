import React, { useEffect } from 'react';

export default function MenuNavbarItem() {

  // Busca el botón hamburguesa que ya tiene Docusaurus
  const openSidebar = () => {
    const realButton = document.querySelector('.navbar__toggle');
    if (realButton) realButton.click();
  };

  return (
    <button
      onClick={openSidebar}
      className="menu-trigger"
      style={{
        background: 'none',
        border: 'none',
        fontSize: '1.1rem',
        cursor: 'pointer',
        color: 'var(--ifm-navbar-link-color)',
      }}
    >
      ☰ Menú
    </button>
  );
}
