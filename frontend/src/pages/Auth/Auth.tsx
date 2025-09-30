import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState, type ChangeEventHandler, type FormEventHandler } from 'react';
import { useLogin } from '../../core/hooks';

type TFormState = {
  email: string;
  password: string;
};

export function Auth() {
  const [formState, setFormState] = useState<TFormState>({ email: '', password: '' });
  const {isLoading, fetchLogin} = useLogin();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    await fetchLogin(formState);
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
              disabled={isLoading}
              label='E-mail'
              type='email'
              name='email'
              value={formState.email}
              required
              onChange={handleChange}
            />
            <TextField
              disabled={isLoading}
              label='Password'
              type='password'
              name='password'
              value={formState.password}
              required
              onChange={handleChange}
            />
          </Stack>
          <Box display='flex' justifyContent='flex-end'>
            <Button loading={isLoading} type='submit' variant='contained'>
              Log in
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
