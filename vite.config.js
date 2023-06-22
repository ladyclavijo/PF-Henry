import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
};
