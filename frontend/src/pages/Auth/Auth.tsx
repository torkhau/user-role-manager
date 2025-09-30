import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState, type ChangeEventHandler, type FormEventHandler } from 'react';

type TFormState = {
  email: string;
  password: string;
};

export function Auth({ onLogin }: { onLogin: () => void }) {
  const [formState, setFormState] = useState<TFormState>({ email: '', password: '' });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onLogin();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth='sm' sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: ({ spacing }) => spacing(2) }}>
        <Stack component='form' spacing={2} onSubmit={handleSubmit}>
          <Typography variant='h5' textAlign='end'>
            Log in
          </Typography>
          <Stack spacing={1}>
            <TextField
              label='E-mail'
              type='email'
              name='email'
              value={formState.email}
              required
              onChange={handleChange}
            />
            <TextField
              label='Password'
              type='password'
              name='password'
              value={formState.password}
              required
              onChange={handleChange}
            />
          </Stack>
          <Box display='flex' justifyContent='flex-end'>
            <Button type='submit' variant='contained'>
              Log in
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
