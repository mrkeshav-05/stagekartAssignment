import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import App from './App.tsx'
import { InventoryProvider } from './context/InventoryContext.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <InventoryProvider>
//       <App />
//     <InventoryProvider />
//   </StrictMode>,
// )
const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </StrictMode>
);