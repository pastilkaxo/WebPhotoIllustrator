import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, Slide } from '@mui/material';

interface RegisterProps {
  onBack: () => void;
}

export default function Register({ onBack }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{ email?: string; login?: string; password?: string; confirm?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
    if (!login) newErrors.login = 'Введите логин';
    if (!password) newErrors.password = 'Введите пароль';
    if (!confirm) newErrors.confirm = 'Подтвердите пароль';
    else if (password !== confirm) newErrors.confirm = 'Пароли не совпадают';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Register data:', { email, login, password });
    }
  };

  return (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 'clamp(280px, 40vw, 400px)',
          p: 'clamp(15px, 3vw, 25px)',
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField label="Электронный адрес" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
          <TextField label="Логин" fullWidth value={login} onChange={(e) => setLogin(e.target.value)} error={!!errors.login} helperText={errors.login} />
          <TextField label="Пароль" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
          <TextField label="Подтверждение пароля" type="password" fullWidth value={confirm} onChange={(e) => setConfirm(e.target.value)} error={!!errors.confirm} helperText={errors.confirm} />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: '25px',
              py: 1.2,
              fontWeight: 'bold',
              bgcolor: 'green',
              '&:hover': { bgcolor: 'darkgreen', transform: 'scale(1.02)' },
              transition: '0.3s',
            }}
          >
            Зарегистрироваться
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: 'center', cursor: 'pointer', color: 'primary.main' }}
            onClick={onBack}
          >
            Назад к авторизации
          </Typography>
        </Stack>
      </Box>
    </Slide>
  );
}
