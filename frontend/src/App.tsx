import { Container, Skeleton } from '@mui/material';
import { useAuthContext } from './core/context/user';
import { useSessionAuth } from './core/hooks';
import { Auth, Dashboard } from './pages';

export default function App() {
  const { user } = useAuthContext();
  const { isSessionChecking } = useSessionAuth();

  if (isSessionChecking) return <Skeleton />;

  return (
    <Container maxWidth='sm' sx={{ m: 'auto', height: '100vh' }}>
      {user ? <Dashboard /> : <Auth />}
    </Container>
  );
}
