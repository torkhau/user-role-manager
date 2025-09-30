import { Container } from '@mui/material';
import { useState } from 'react';
import { Auth, Dashboard } from './pages';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Container maxWidth='sm' sx={{ m: 'auto', height: '100vh' }}>
      {isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Auth onLogin={handleLogin} />}
    </Container>
  );
}
