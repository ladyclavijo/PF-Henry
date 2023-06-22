import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },

  esbuild: {
    // Opciones de configuración de Esbuild
    // Ejemplo:
    jsxInject: `import React from 'react';`,
  },
});

