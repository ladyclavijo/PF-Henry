import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    jsxInject: `import React from 'react';`,
    // Agrega otras opciones de configuración de compilación según tus necesidades
  },
};
