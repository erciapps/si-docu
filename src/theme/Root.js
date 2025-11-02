import React, { useEffect } from "react";

export default function Root({ children }) {
  useEffect(() => {
    // Importa Flowbite solo en el cliente (no durante SSR)
    import("flowbite");
  }, []);

  return <>{children}</>;
}
