import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Landing from './pages/landing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Landing />
  </StrictMode>
);
