import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('Login Success: currentUser:', credentialResponse);
    navigate('/');
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        maxWidth: '400px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Электронный адрес"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="outlined-password-input"
        label="Пароль"
        type="password"
        autoComplete="current-password"
        fullWidth
      />
      <a
        href="#"
        style={{
          textDecoration: 'none',
          fontSize: '14px',
          marginTop: '10px',
          color: '#007bff',
        }}
      >
        Забыли пароль?
      </a>
      <button
        type="submit"
        id="accEnter"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '15px',
          borderRadius: '30px',
          backgroundColor: 'red',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, background-color 0.1s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseDown={(e) => (e.currentTarget.style.backgroundColor = 'green')}
        onMouseUp={(e) => (e.currentTarget.style.backgroundColor = 'red')}
      >
        Войти
      </button>
      <p className="text-dark m-0 p-1" style={{ fontSize: '14px' }}>
        ИЛИ
      </p>
      <a
        className="pt-2"
        href="#"
        style={{
          textDecoration: 'none',
          fontSize: '14px',
          textAlign: 'center',
          color: '#007bff',
        }}
      >
        Ещё не зарегистрированы в Muse?{' '}
        <span className="text-dark" style={{ fontWeight: 'bold' }}>
          Зарегистрироваться
        </span>
      </a>
    </Box>
  );
}