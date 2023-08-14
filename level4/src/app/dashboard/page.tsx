'use client';

import {Dialog, Transition} from '@headlessui/react';
import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from 'react';
import {DateTime} from 'luxon';
import axios from 'axios';

const Page = (): JSX.Element => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [employee, setEmployee] = useState<{
    id: number;
    name: string;
    dob: string;
    status: string;
    address: string;
    nik: string;
    npwp: string;
  }>({id: 0, name: '', dob: '', status: '', address: '', nik: '', npwp: ''});
  const [employees, setEmployees] = useState<(typeof employee)[]>([]);

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

  const handleAddEmployee = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    axios
      .post('http://localhost:9090/api/v1/karyawan/save', {
        name: employee.name,
        dob: employee.dob,
        status: employee.status,
        address: employee.address,
        karyawanDetail: {
          nik: employee.nik,
          npwp: employee.npwp
        }
      })
      .then((response): void => {
        if (response.data.message === 'Success') {
          setEmployees([
            ...employees,
            {
              id: response.data.data.id,
              name: response.data.data.name,
              dob: response.data.data.dob,
              status: response.data.data.status,
              address: response.data.data.address,
              nik: response.data.data.karyawanDetail.nik,
              npwp: response.data.data.karyawanDetail.npwp
            }
          ]);
          setShowAdd(false);
        }
      });
  };

  const handleViewEmployee = (employeeId: number): void => {
    const emp = employees.find((emp): boolean => emp.id === employeeId)!;
    setEmployee({
      ...employee,
      id: emp.id,
      name: emp.name,
      dob: emp.dob,
      status: emp.status,
      address: emp.address,
      nik: emp.nik,
      npwp: emp.npwp
    });
    setShowView(true);
  };

  const handleEditEmployee = (employeeId: number): void => {
    const emp = employees.find((emp): boolean => emp.id === employeeId)!;
    setEmployee({
      ...employee,
      id: emp.id,
      name: emp.name,
      dob: emp.dob,
      status: emp.status,
      address: emp.address,
      nik: emp.nik,
      npwp: emp.npwp
    });
    setShowEdit(true);
  };

  const handleUpdateEmployee = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    axios
      .put('http://localhost:9090/api/v1/karyawan/update', {
        id: employee.id,
        name: employee.name,
        dob: DateTime.fromISO(employee.dob).toFormat('yyyy-MM-dd'),
        status: employee.status,
        address: employee.address,
        karyawanDetail: {
          nik: employee.nik,
          npwp: employee.npwp
        }
      })
      .then((response): void => {
        if (response.data.message === 'Success') {
          setEmployees(
            employees.map((emp): typeof employee => {
              if (emp.id === response.data.data.id) {
                emp = {
                  ...emp,
                  name: response.data.data.name,
                  dob: response.data.data.dob,
                  status: response.data.data.status,
                  address: response.data.data.address,
                  nik: response.data.data.karyawanDetail.nik,
                  npwp: response.data.data.karyawanDetail.npwp
                };
              }
              return emp;
            })
          );
          setShowEdit(false);
        }
      });
  };

  const handleConfirmDeleteEmployee = (employeeId: number): void => {
    const emp = employees.find((emp): boolean => emp.id === employeeId)!;
    setEmployee({
      ...employee,
      id: emp.id
    });
    setShowDelete(true);
  };

  const handleDeleteEmployee = (): void => {
    axios
      .delete(`http://localhost:9090/api/v1/karyawan/delete/${employee.id}`)
      .then((response): void => {
        if (response.data.message === 'Success') {
          setEmployees(
            employees.filter((emp): boolean => emp.id !== employee.id)
          );
          setShowDelete(false);
        }
      });
  };

  useEffect((): void => {
    axios
      .get('http://localhost:9090/api/v1/karyawan/list?page=0&size=1000')
      .then((response): void => {
        if (response.data.message === 'Success') {
          for (const emp of response.data.data.content) {
            setEmployees([
              ...employees,
              {
                id: emp.id,
                name: emp.name,
                dob: emp.dob,
                status: emp.status,
                address: emp.address,
                nik: emp.karyawanDetail.nik,
                npwp: emp.karyawanDetail.npwp
              }
            ]);
          }
        }
      });
  }, []);

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
          {employees.length === 0 && (
            <tr>
              <th
                className='font-normal italic'
                colSpan={8}
              >
                Belum ada data.
              </th>
            </tr>
          )}
          {employees.map(
            (emp, index): JSX.Element => (
              <tr>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{DateTime.fromISO(emp.dob).toLocaleString()}</td>
                <td className='capitalize'>{emp.status}</td>
                <td>{emp.address}</td>
                <td>{emp.nik}</td>
                <td>{emp.npwp}</td>
                <td className='space-x-2'>
                  <button
                    className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                    type='button'
                    onClick={(): void => handleViewEmployee(emp.id)}
                  >
                    View
                  </button>
                  <button
                    className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                    type='button'
                    onClick={(): void => handleEditEmployee(emp.id)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-blue-500 px-4 py-1 font-semibold text-white duration-150 hover:bg-blue-600'
                    type='button'
                    onClick={(): void => handleConfirmDeleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
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
                        handleAddEmployee(event)
                      }
                    >
                      <div className='grid'>
                        <label>Nama</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='Nama'
                          value={employee.name}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, name: event.target.value})
                          }
                        />
                      </div>
                      <div className='grid'>
                        <label>Tanggal Lahir</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='date'
                          value={employee.dob}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, dob: event.target.value})
                          }
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
                            checked={employee.status === 'active'}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ): void =>
                              setEmployee({
                                ...employee,
                                status: event.target.value
                              })
                            }
                          />
                          <label>Active</label>
                        </div>
                        <div>
                          <input
                            className='mr-2 border-2 px-3 py-1'
                            name='status'
                            type='radio'
                            value='inactive'
                            checked={employee.status === 'inactive'}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ): void =>
                              setEmployee({
                                ...employee,
                                status: event.target.value
                              })
                            }
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
                          value={employee.address}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({
                              ...employee,
                              address: event.target.value
                            })
                          }
                        />
                      </div>
                      <div className='grid'>
                        <label>NIK</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NIK'
                          value={employee.nik}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, nik: event.target.value})
                          }
                        />
                      </div>
                      <div className='grid'>
                        <label>NPWP</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NPWP'
                          value={employee.npwp}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, npwp: event.target.value})
                          }
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
                        <span>{employee.name}</span>
                      </div>
                      <div>
                        <label>Tanggal Lahir: </label>
                        <span>
                          {DateTime.fromISO(employee.dob).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <label>Status: </label>
                        <span className='capitalize'>{employee.status}</span>
                      </div>
                      <div>
                        <label>Alamat: </label>
                        <span>{employee.address}</span>
                      </div>
                      <div>
                        <label>NIK: </label>
                        <span>{employee.nik}</span>
                      </div>
                      <div>
                        <label>NPWP: </label>
                        <span>{employee.npwp}</span>
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
                        handleUpdateEmployee(event)
                      }
                    >
                      <div className='grid'>
                        <label>Nama</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='Nama'
                          value={employee.name}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, name: event.target.value})
                          }
                        />
                      </div>
                      <div className='grid'>
                        <label>Tanggal Lahir</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='date'
                          value={DateTime.fromISO(employee.dob).toFormat(
                            'yyyy-MM-dd'
                          )}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, dob: event.target.value})
                          }
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
                            checked={employee.status === 'active'}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ): void =>
                              setEmployee({
                                ...employee,
                                status: event.target.value
                              })
                            }
                          />
                          <label>Active</label>
                        </div>
                        <div>
                          <input
                            className='mr-2 border-2 px-3 py-1'
                            name='status'
                            type='radio'
                            value='inactive'
                            checked={employee.status === 'inactive'}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ): void =>
                              setEmployee({
                                ...employee,
                                status: event.target.value
                              })
                            }
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
                          value={employee.address}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({
                              ...employee,
                              address: event.target.value
                            })
                          }
                        />
                      </div>
                      <div className='grid'>
                        <label>NIK</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NIK'
                          value={employee.nik}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, nik: event.target.value})
                          }
                        />
                      </div>
                      <div className='grid'>
                        <label>NPWP</label>
                        <input
                          className='border-2 px-3 py-1'
                          type='text'
                          placeholder='NPWP'
                          value={employee.npwp}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ): void =>
                            setEmployee({...employee, npwp: event.target.value})
                          }
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
                      onClick={(): void => handleDeleteEmployee()}
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
