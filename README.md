# 💱 Crypto Rate Checker

Una plataforma web desarrollada con **React** que permite al usuario consultar en tiempo real la cotización de una criptomoneda en una moneda local seleccionada.

## 🚀 Características

- Selección de criptomoneda y moneda local.
- Ingreso de monto y consulta de cotización en tiempo real.
- Validación de formularios con **Zod**.
- Estado global manejado con **Zustand**.
- Consumo de datos desde una API de criptomonedas.

## 🛠️ Tecnologías utilizadas

- [React](https://react.dev/) – Biblioteca para construir interfaces de usuario.
- [Zod](https://zod.dev/) – Validación y parseo de formularios.
- [Zustand](https://zustand-demo.pmnd.rs/) – Manejo de estado simple y rápido.
- [Crypto API](https://www.coingecko.com/en/api) – Fuente de datos para cotizaciones (puede ser CoinGecko, CoinMarketCap u otra).
- [Vite](https://vitejs.dev/) (opcional) – Para desarrollo con bundling veloz.

## 📸 Capturas (opcional)

*Acá podés agregar screenshots de la interfaz.*

## 📦 Instalación

```bash
git clone https://github.com/tuusuario/crypto-rate-checker.git
cd crypto-rate-checker
npm install
npm run dev
```

## 📁 Estructura del proyecto
```
src/
├── components/         # Componentes reutilizables
├── hooks/              # Custom hooks (incluyendo los de Zustand)
├── services/           # Lógica para llamadas a la API
├── schemas/            # Esquemas de validación Zod
├── pages/              # Páginas principales
├── App.jsx
├── main.jsx
```

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Podés usarlo y modificarlo libremente.

**Hecho con ❤️ usando React..**
