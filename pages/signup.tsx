import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { RoleType, SignUp, SignUpError } from '../types/signup.types';
import Wrapper from '../components/ui/Wrapper';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from '@apollo/client';
import { CreateUserInput, CreateUserResponse, SIGNUP } from '../grapgql/queries/user';
import { showErrorToast } from '../components/ToastNotify';

interface Role {
  value: RoleType
  label: RoleType
}

const roles: Role[] = [{
  value: 'READ',
  label: 'READ'
}, {
  value: 'FULL_ACCESS',
  label: 'FULL_ACCESS'
}];

export default function SignUp () {
  const router = useRouter();
  const [signupForm, setSignupForm] = useState<SignUp>({
    role: roles[0].value
  });
  const [signUpError, setSignUpError] = useState<SignUpError>(null);
  const [initial, setInitial] = useState(true);

  const disableButton = useMemo(
    () => !!(signUpError?.username || signUpError?.password || signUpError?.confirmPassword) || initial,
    [signUpError, initial]
  );

  const handleUsernameChange = (event: any) => {
    const value = event.target.value;  
    const usernameError = !value ? 'Username is required.' : '';

    setSignUpError({
      ...signUpError,
      username: usernameError,
    });

    setSignupForm({
      ...signupForm,
      username: value
    });

    setInitial(false);
  }

  const handlePasswordChange = (event: any) => {
    const value = event.target.value;
    const passwordError = !value ? 'Password is required.' : '';

    setSignUpError({
      ...signUpError,
      password: passwordError,
    });

    setSignupForm({
      ...signupForm,
      password: value
    });

    setInitial(false);
  }

  const handleConfirmPasswordChange = (event: any) => {
    const value = event.target.value;
    const confirmPasswordError = !value ?
      'You must confirm password.' :
      signupForm?.password !== value ?
      'Passwords must match' :
      '';

    setSignUpError({
      ...signUpError,
      confirmPassword: confirmPasswordError,
    });

    setSignupForm({
      ...signupForm,
      confirmPassword: value
    });

    setInitial(false);
  }

  const handleRoleChange = (event: any) => {
    const value = event.target.value;

    setSignupForm({
      ...signupForm,
      role: value
    });

    setInitial(false);
  }

  const [signup] = useMutation<CreateUserResponse, CreateUserInput>(SIGNUP, {
    variables: {
      createUserInput: {
        username: signupForm?.username,
        password: signupForm?.password,
        confirmPassword: signupForm?.confirmPassword,
        role: signupForm?.role
      }
    },
    onCompleted: () => {
      router.push('/login');
    },
    onError: (error => {      
      showErrorToast(error.message);
    })
  })

  return (
    <Wrapper className='bg-login min-h-screen'>
      <Card>        
        <div className='flex justify-center rounded-md relative'>
          <button
            className="absolute md:left-2 left-0 align-middle"
            onClick={() => router.back()}
          >
            <ArrowBackIcon />
          </button>
          <h1 className='text-3xl text-primary-color text-center font-playfair my-2'>
            Sign Up
          </h1>          
        </div>
        <Input
          label='Username'
          name='username'
          required
          className='w-full'
          onChange={handleUsernameChange}
          value={signupForm?.username}
          hasError={!!signUpError?.username}
          errorText={signUpError?.username}
        />
        <Input
          label='Password'
          name='password'
          type={'password'}
          required
          className='w-full'
          onChange={handlePasswordChange}
          value={signupForm?.password}
          hasError={!!signUpError?.password}
          errorText={signUpError?.password}
        />

        <Input
          label='Confirm Password'
          name='confirmPassword'
          type={'password'}
          required
          className='w-full'
          onChange={handleConfirmPasswordChange}
          value={signupForm?.confirmPassword}
          hasError={!!signUpError?.confirmPassword}
          errorText={signUpError?.confirmPassword}
        />
        <div>
          <label className="text-sm block mx-2.5">
            Select Role
          </label>
          <select
            className="bg-transparent w-full p-3 pl-2.5 border-b-2 border-gray-400"
            onChange={handleRoleChange}
            value={signupForm?.role}
          >
            {roles.map((role, index) => (
              <option
                key={index}
                value={role.value}
              >
                { role.label }
              </option>
            ))}        
          </select>
        </div>
        <PrimaryButton onClick={signup} disabled={disableButton}>
          SignUp
        </PrimaryButton>
      </Card>
    </Wrapper>
  );
}
