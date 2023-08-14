import {Button, Form} from 'react-bootstrap';
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
    <section style={{padding: '16px'}}>
      <div className='font-bold text-2xl'>ToDo List</div>
      <div className='space-x-3'>
        <input
          className='border border-gray-500 py-1 px-2 outline-0'
          placeholder='Masukkan tugas'
          value={newTask}
          onChange={handleSetNewTask}
        />
        <Button
          variant='primary'
          disabled={newTask.length === 0}
          onClick={(): void => handleAddTask(newTask)}
        >
          Tambah
        </Button>
      </div>
      {tasks.length !== 0 && (
        <Form>
          {tasks.map(
            (task): JSX.Element => (
              <Form.Group style={{display: 'flex', marginBottom: '10px'}}>
                <Form.Check
                  checked={task.done}
                  onChange={(): void => handleDoneTask(task.id)}
                  style={{marginRight: '10px'}}
                />
                <Form.Label style={{marginRight: '10px', textDecorationLine: `${task.done ? 'line-through' : ''}`}}>
                  {task.name}
                </Form.Label>
                <Button
                  variant='danger'
                  type='button'
                  onClick={(): void => handleDeleteTask(task.id)}
                >
                  Hapus
                </Button>
              </Form.Group>
            )
          )}
        </Form>
      )}
      <div>
        Total tugas belum selesai:{' '}
        {tasks.filter((task): boolean => !task.done).length}
      </div>
      <div className='space-x-4'>
        <Button
          variant='primary'
          type='button'
          onClick={(): void => handleDoneAllTasks()}
          style={{marginRight: '10px'}}
        >
          Tandai semua selesai
        </Button>
        <Button
          variant='danger'
          onClick={(): void => handleDeleteAllTasks()}
        >
          Hapus semua
        </Button>
      </div>
    </section>
  );
};

export default App;
