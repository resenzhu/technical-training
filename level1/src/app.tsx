import './app.css';

import {ChangeEvent, useState} from 'react';

type Task = {id: string; name: string; done: boolean};

const App = (): JSX.Element => {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSetNewTask = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (task: string): void => {
    setNewTask('');
    setTasks([...tasks, {id: crypto.randomUUID(), name: task, done: false}]);
  };

  const handleDoneTask = (taskId: string): void => {
    const updatedTasks = tasks.map((task): Task => {
      if (task.id === taskId) {
        task.done = !task.done;
      }

      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string): void => {
    const updatedTasks = tasks.filter((task): boolean => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDoneAllTasks = (): void => {
    const updatedTasks = tasks.map(
      (task): Task => ({
        ...task,
        done: true
      })
    );
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = (): void => {
    setTasks([]);
  };

  return (
    <section className='p-8 flex flex-col space-y-4 text-sm'>
      <div className='font-bold text-2xl'>ToDo List</div>
      <div className='space-x-3'>
        <input
          className='border border-gray-500 py-1 px-2 outline-0'
          placeholder='Masukkan tugas'
          value={newTask}
          onChange={handleSetNewTask}
        />
        <button
          className='bg-blue-500 text-white font-semibold px-2 py-1 disabled:bg-gray-400'
          type='button'
          disabled={newTask.length === 0}
          onClick={(): void => handleAddTask(newTask)}
        >
          Tambah
        </button>
      </div>
      {tasks.length !== 0 && (
        <div className='space-y-2'>
          {tasks.map(
            (task): JSX.Element => (
              <div className='space-x-2'>
                <input
                  type='checkbox'
                  checked={task.done}
                  onChange={(): void => handleDoneTask(task.id)}
                />
                <label className={`${task.done ? 'line-through' : ''}`}>
                  {task.name}
                </label>
                <button
                  className='bg-blue-500 text-white font-semibold px-2 py-1'
                  type='button'
                  onClick={(): void => handleDeleteTask(task.id)}
                >
                  Hapus
                </button>
              </div>
            )
          )}
        </div>
      )}
      <div>
        Total tugas belum selesai:{' '}
        {tasks.filter((task): boolean => !task.done).length}
      </div>
      <div className='space-x-4'>
        <button
          className='bg-blue-500 text-white font-semibold px-2 py-1'
          type='button'
          onClick={(): void => handleDoneAllTasks()}
        >
          Tandai semua selesai
        </button>
        <button
          className='bg-blue-500 text-white font-semibold px-2 py-1'
          type='button'
          onClick={(): void => handleDeleteAllTasks()}
        >
          Hapus semua
        </button>
      </div>
    </section>
  );
};

export default App;
