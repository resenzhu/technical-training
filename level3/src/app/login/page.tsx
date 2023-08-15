'use client';

import type {FormEvent} from 'react';
import {useRouter} from 'next/navigation';

const Page = (): JSX.Element => {
  const {push} = useRouter();

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    push('/dashboard');
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
          />
          <input
            className='border-2 px-3 py-1'
            type='password'
            placeholder='Password'
          />
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
