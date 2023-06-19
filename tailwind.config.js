module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      spacing: {
        fractional: true,
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {
      colors: {
        'border-custom-blue': 'rgb(12, 81, 133)',
      },
      gridTemplateColumns: ['responsive'],
      gridColumn: ['responsive'],
      gridColumnStart: ['responsive'],
      gridColumnEnd: ['responsive'],
      
    },
  },
  plugins: [
    
  ],
};

console.log('Configuración de Tailwind CSS cargada');
