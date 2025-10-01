import { Button, Container } from '@mui/material';
import { useAuthContext } from '../../core/contexts/auth/context';

export function Dashboard() {
  const { logout } = useAuthContext();

  return (
    <Container>
      <Button variant='contained' onClick={logout}>
        Log out
      </Button>
    </Container>
  );
}
