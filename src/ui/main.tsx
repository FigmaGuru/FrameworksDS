import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  // Fail loudly in Figma if #root is missing
  const msg = document.createElement('div');
  msg.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
  msg.style.fontSize = '12px';
  msg.style.color = '#0f172a';
  msg.style.padding = '12px';
  msg.textContent = 'FrameworksDS: Root element #root not found in index.html';
  document.body.appendChild(msg);
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
