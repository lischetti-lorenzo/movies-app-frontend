import { useState, useMemo, useEffect, useContext } from 'react';
import { Login, LoginResponse } from '../types/login.types';
import Card from '../components/ui/Card';
import Link from 'next/link';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import Wrapper from '../components/ui/Wrapper';
import Input from '../components/ui/Input';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../grapgql/queries/user';
import { AUTH_TOKEN } from '../constants/auth';
import { AuthContext } from '../services/providers/AuthContext';
import { showErrorToast } from '../components/ToastNotify';

interface LoginError {
  username: string
  password: string
}

export default function Login() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState<Login>({
    username: '',
    password: '',
  });
  const [initial, setInitial] = useState(true);
  const [loginError, setLoginError] = useState<LoginError>({
    username: '',
    password: '',
  });

  const [login] = useMutation(LOGIN, {
    variables: { loginUserInput: loginForm },
    onCompleted: (data: LoginResponse) => {
      const { access_token, user } = data.login;
      if (access_token && user) {
        localStorage.setItem(AUTH_TOKEN, access_token);
        setUser(user);
        router.push('/');
      }
    },
    onError: (error => {      
      showErrorToast(error.message);
    })
  })

  useEffect(() => {
    setInitial(loginForm?.username === '' || loginForm?.password === '');
  }, [loginForm]);

  const disableButton = useMemo(
    () => !!(loginError?.username || loginError?.password) || initial,
    [loginError, initial]
  );

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    if (name === 'username') {
      const usernameError = !value ? 'Username is required.' : '';

      setLoginError({
        ...loginError,
        username: usernameError,
      });
    }

    if (name === 'password') {
      const passwordError = !value ? 'Password is required.' : '';

      setLoginError({
        ...loginError,
        password: passwordError,
      });
    }

    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  return (
    <Wrapper className='bg-login min-h-screen'>
      <Card>
        <div className='flex justify-center rounded-md relative'>
          <h1 className='text-3xl text-primary-color text-center font-playfair my-2'>
            Login
          </h1>
        </div>
        <Input
          label='Username'
          name='username'
          required
          className='w-full'
          onChange={handleInputChange}
          value={loginForm?.username}
          hasError={!!loginError?.username}
          errorText={loginError?.username}
        />
        <Input
          label='Password'
          name='password'
          type={'password'}
          required
          className='w-full'
          onChange={handleInputChange}
          value={loginForm?.password}
          hasError={!!loginError?.password}
          errorText={loginError?.password}
        />
        <PrimaryButton onClick={login} disabled={disableButton}>
          Login
        </PrimaryButton>
        <Link
          href={'/signup'}
          className='text-center text-base text-secondary-color border-b inline-block mx-auto my-3 cursor-pointer'
        >
          Sign Up
        </Link>
      </Card>
    </Wrapper>
  );
}
