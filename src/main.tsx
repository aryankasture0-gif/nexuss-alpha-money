import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { trackEvent } from './lib/analytics';

if (window.location.pathname !== '/admin' && window.location.pathname !== '/admin/dashboard') trackEvent('page_view');
document.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest('a');
  const href = link?.getAttribute('href') || '';
  if (href.startsWith('https://wa.me/') || href.startsWith('tel:')) trackEvent(href.startsWith('tel:') ? 'phone_click' : 'whatsapp_click');
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
