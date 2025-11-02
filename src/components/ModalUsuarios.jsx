import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalCardUsuarios() {
  const [open, setOpen] = useState(false);

  // Cierre con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const usuarios = [
    ["dam70", "Alejandro"],
    ["dam71", "Daniel"],
    ["dam72", "Diego"],
    ["dam73", "Francisco"],
    ["dam74", "Eva"],
    ["dam75", "Miguel D"],
    ["dam76", "David E"],
    ["dam77", "Mathías Joshua"],
    ["dam78", "Caua"],
    ["dam79", "Miguel M"],
    ["dam80", "Josué Mirko"],
    ["dam81", "Iker"],
    ["dam82", "P. Joshimar"],
    ["dam83", "Eros Ricardo"],
    ["dam84", "David L"],
    ["dam85", "Diego R"],
    ["dam86", "Juan Carlos"],
    ["dam87", "Samuel Esteban"],
    ["dam88", "Daniel S"],
    ["dam89", "Teodor"],
    ["dam90", "Óscar"],
    ["dam91", "Kevin Francisco"],
  ];

  // ✅ Paleta de color coherente con tus tarjetas
  const accent = "#fb8c00";
  const gradientFrom = "#4a2500";
  const gradientTo = "#e65100";

  return (
    <>
      {/* === TARJETA PRINCIPAL === */}
      <article
        className="lift-card relative overflow-hidden rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl"
        style={{
          background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})`,
          color: "white",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${accent}, transparent 70%)`,
          }}
        ></div>

        <div className="relative z-10">
          <span
            style={{
              backgroundColor: "#fdba74",
              color: "#4a2500",
              fontWeight: "bold",
              borderRadius: "9999px",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
            }}
          >
            UT-Usuarios
          </span>

          <h3 className="text-2xl font-bold mt-3 mb-2">
            Identificadores de usuario
          </h3>

          <p className="opacity-90 mb-4 text-sm">
            Consulta los identificadores de usuario asignados a cada alumno del
            curso actual.
          </p>

          <div className="text-center">
            <button
              onClick={() => setOpen(true)}
              style={{
                backgroundColor: accent,
                color: "#fff",
                borderRadius: "0.5rem",
                padding: "0.5rem 1.5rem",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              className="hover:brightness-110 hover:scale-105 shadow-md"
            >
              VER LISTA →
            </button>
          </div>
        </div>
      </article>

      {/* === MODAL === */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fondo difuminado */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Contenedor modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    Identificadores de usuario
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Tabla */}
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-xs">
                        <th className="p-3 border-b dark:border-gray-600">
                          Usuario
                        </th>
                        <th className="p-3 border-b dark:border-gray-600">
                          Nombre
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map(([usuario, nombre], i) => (
                        <tr
                          key={usuario}
                          className={`${
                            i % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-900"
                          } hover:bg-orange-50 dark:hover:bg-gray-700 transition`}
                        >
                          <td className="p-3 border-b dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-100">
                            {usuario}
                          </td>
                          <td className="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">
                            {nombre}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-semibold transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
