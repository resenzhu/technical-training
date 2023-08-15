'use client';

import {type ChangeEvent, type FormEvent, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

const Page = (): JSX.Element => {
  const {push} = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const handleChangeUsername = (username: string): void => {
    setUsername(username);
    setShowError(false);
  };

  const handleChangePassword = (password: string): void => {
    setPassword(password);
    setShowError(false);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    axios
      .post('http://localhost:9090/api/login-user', {
        email: username,
        password: password
      })
      .then((response): void => {
        if (response.data.message === 'Success') {
          push('/dashboard');
        } else {
          setShowError(true);
        }
      });
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-blue-900'>
      <div className='w-fit space-y-2 bg-white p-4'>
        <div className='text-center font-bold'>LOGIN</div>
        <form
          className='flex flex-col items-center justify-center space-y-3'
          onSubmit={(event: FormEvent<HTMLFormElement>): void =>
            handleLogin(event)
          }
        >
          <input
            className='border-2 px-3 py-1'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              handleChangeUsername(event.target.value)
            }
          />
          <input
            className='border-2 px-3 py-1'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              handleChangePassword(event.target.value)
            }
          />
          {showError && (
            <div className='text-red-500'>wrong email or password</div>
          )}
          <button
            className='w-fit bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
            type='submit'
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
