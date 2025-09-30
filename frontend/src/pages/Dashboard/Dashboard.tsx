import { Button, Container } from '@mui/material';

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <Container>
      <Button variant='contained' onClick={onLogout}>Log out</Button>
    </Container>
  );
}
