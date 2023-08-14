'use client';

import {Dialog, Transition} from '@headlessui/react';
import {FormEvent, Fragment, useState} from 'react';

const Page = (): JSX.Element => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const handleToggleAdd = (show: boolean): void => {
    setShowAdd(show);
  };

  const handleToggleView = (show: boolean): void => {
    setShowView(show);
  };

  const handleToggleEdit = (show: boolean): void => {
    setShowEdit(show);
  };

  const handleToggleDelete = (show: boolean): void => {
    setShowDelete(show);
  };

  return (
    <div className='flex flex-col space-y-6 p-6 text-sm'>
      <div className='flex justify-between'>
        <div className='font-bold'>LIST DATA PEGAWAI</div>
        <div>
          <button
            className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
            type='button'
            onClick={(): void => handleToggleAdd(true)}
          >
            TAMBAH DATA
          </button>
        </div>
      </div>
      <table className='flex-1 text-center'>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <th>Status</th>
            <th>Alamat</th>
            <th>NIK</th>
            <th>NPWP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Batman</td>
            <td>07-04-1915</td>
            <td>Active</td>
            <td>Gotham City</td>
            <td>12345</td>
            <td>67890</td>
            <td className='space-x-2'>
              <button
                className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                type='button'
                onClick={(): void => handleToggleView(true)}
              >
                View
              </button>
              <button
                className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                type='button'
                onClick={(): void => handleToggleEdit(true)}
              >
                Edit
              </button>
              <button
                className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                type='button'
                onClick={(): void => handleToggleDelete(true)}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Transition
        appear
        show={showAdd}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-10'
          onClose={(): void => handleToggleAdd(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto text-sm'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-150'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-150'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Tambah Data Pegawai
                  </Dialog.Title>
                  <div className='mt-2'>
                    <form
                      className='flex flex-col space-y-3'
                      onSubmit={(event: FormEvent<HTMLFormElement>): void =>
                        event.preventDefault()
                      }
                    >
                      <div className='grid'>
                        <label>Nama</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='Nama'
                        />
                      </div>
                      <div className='grid'>
                        <label>Tanggal Lahir</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='date'
                        />
                      </div>
                      <div className='grid'>
                        <label>Status</label>
                        <div>
                          <input
                            className='mr-2 border-2 px-3 py-1'
                            name='status'
                            type='radio'
                            value='active'
                          />
                          <label>Active</label>
                        </div>
                        <div>
                          <input
                            className='mr-2 border-2 px-3 py-1'
                            name='status'
                            type='radio'
                            value='inactive'
                          />
                          <label>Inactive</label>
                        </div>
                      </div>
                      <div className='grid'>
                        <label>Alamat</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='Alamat'
                        />
                      </div>
                      <div className='grid'>
                        <label>NIK</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NIK'
                        />
                      </div>
                      <div className='grid'>
                        <label>NPWP</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NPWP'
                        />
                      </div>
                      <button
                        className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                        type='submit'
                      >
                        TAMBAH
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition
        appear
        show={showView}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-10'
          onClose={(): void => handleToggleView(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto text-sm'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-150'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-150'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Detail Pegawai
                  </Dialog.Title>
                  <div className='mt-2'>
                    <form
                      className='flex flex-col space-y-3'
                      onSubmit={(event: FormEvent<HTMLFormElement>): void =>
                        event.preventDefault()
                      }
                    >
                      <div>
                        <label>Nama: </label>
                        <span>Batman</span>
                      </div>
                      <div>
                        <label>Tanggal Lahir: </label>
                        <span>07-04-1915</span>
                      </div>
                      <div>
                        <label>Status: </label>
                        <span>Active</span>
                      </div>
                      <div>
                        <label>Alamat: </label>
                        <span>Gotham City</span>
                      </div>
                      <div>
                        <label>NIK: </label>
                        <span>12345</span>
                      </div>
                      <div>
                        <label>NPWP: </label>
                        <span>67890</span>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition
        appear
        show={showEdit}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-10'
          onClose={(): void => handleToggleEdit(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto text-sm'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-150'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-150'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Edit Data Pegawai
                  </Dialog.Title>
                  <div className='mt-2'>
                    <form
                      className='flex flex-col space-y-3'
                      onSubmit={(event: FormEvent<HTMLFormElement>): void =>
                        event.preventDefault()
                      }
                    >
                      <div className='grid'>
                        <label>Nama</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='Nama'
                          value='Batman'
                        />
                      </div>
                      <div className='grid'>
                        <label>Tanggal Lahir</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='date'
                          value='1915-04-07'
                        />
                      </div>
                      <div className='grid'>
                        <label>Status</label>
                        <div>
                          <input
                            className='mr-2 border-2 px-3 py-1'
                            name='status'
                            type='radio'
                            value='active'
                            checked={true}
                          />
                          <label>Active</label>
                        </div>
                        <div>
                          <input
                            className='mr-2 border-2 px-3 py-1'
                            name='status'
                            type='radio'
                            value='inactive'
                          />
                          <label>Inactive</label>
                        </div>
                      </div>
                      <div className='grid'>
                        <label>Alamat</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='Alamat'
                          value='Gotham City'
                        />
                      </div>
                      <div className='grid'>
                        <label>NIK</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NIK'
                          value='12345'
                        />
                      </div>
                      <div className='grid'>
                        <label>NPWP</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NPWP'
                          value='67890'
                        />
                      </div>
                      <button
                        className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                        type='submit'
                      >
                        EDIT
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition
        appear
        show={showDelete}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-10'
          onClose={(): void => handleToggleDelete(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto text-sm'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-150'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-150'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Hapus Data Pegawai
                  </Dialog.Title>
                  <div className='mt-2 flex flex-col space-y-4'>
                    <div>
                      Apakah Anda ingin{' '}
                      <span className='font-bold text-red-500'>menghapus</span>{' '}
                      data pegawai ini?
                    </div>
                    <button
                      className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                      type='button'
                    >
                      HAPUS
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Page;
